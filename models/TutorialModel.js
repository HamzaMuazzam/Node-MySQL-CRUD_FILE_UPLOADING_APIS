const db = require("../config/db");

class TutorialModelClass {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO user(
      name,
      addre,
      
    )
    VALUES(
      '${this.title}',
      '${this.body}',
      
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM tutorials;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM user WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = TutorialModelClass;
