//store actual trip info.
//once the user pressed the start trip button, create a trip instance and store it to trips table
//return an identifer of the trip
//user the identifer later after the trip has ended.

"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/updatesql");
const { getNearbyDocks } = require("../helpers/getdocks");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for trips. */

class Trip {
  /** given location[geo coordinates] based on user input
   *
   * Returns a list of nearby bike docks ordered by dock occupancy in descending order.
   *
   * Throws NotFoundError if no bike docks is returned from the TFL API.
   **/
  static async recommendDocks(coord1) {
    const docks = await getNearbyDocks(coord1);
    if (docks.length == 0)
      throw new NotFoundError(`No Bike Docks Found near: ${coord1}`);
  }
  static async startTrip({ username, start_dock, start_time }) {
    const result = await db.query(
      `INSERT INTO trips
             (username,
              start_dock,
              start_time)
             VALUES ($1, $2,$3)
             RETURNING id, username, start_dock,start_time`,
      [username, start_dock, start_time]
    );

    const user = result.rows[0];

    return user;
  }
  static async endTrip() {}
  static async findAll() {}

  /** Register user with data.
   *
   * Returns { username, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({
    username,
    password,
    weight,
    height,
    email,
    is_admin,
  }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            weight,
            height,
            email,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, email, is_admin`,
      [username, hashedPassword, weight, height, email, is_admin]
    );

    const user = result.rows[0];

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   * { password, email, height, weight }
   *
   * Returns { username, email, height, weight }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */
  //TODO check out sqlForPartial Update
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      password: "password",
      email: "email",
      height: "height",
      weight: "weight",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                email,
                                weight,
                                height`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Find all users [**admin use**]
   *
   * Returns [{ username, height, weight, email, is_admin }, ...]
   **/
  static async findAll() {
    const result = await db.query(
      `SELECT username,
              height,
              weight,
              email,
              is_admin
        FROM users
        ORDER BY username`
    );

    return result.rows;
  }

  /** Given a username, return data about user.[admin use]
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              height,
              weight,
              email,
              is_admin
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = Trip;
