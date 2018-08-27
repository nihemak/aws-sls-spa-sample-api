import * as validator from "validator";

export class AssocValidator {
  public static validate(
    data: { [field: string]: any },
    rules: { [field: string]: string[] }
  ) {
    let errors: { [field: string]: string } = {};
    for (let key in rules) {
      for (let i = 0; i < rules[key].length; i++) {
        switch (rules[key][i]) {
          case "required":
            if (!this.isRequired(data, key)) {
              errors[key] = "required";
            }
            break;
          case "string":
            if (!this.isString(data, key)) {
              errors[key] = "string";
            }
            break;
          case "boolean":
            if (!this.isBoolean(data, key)) {
              errors[key] = "boolean";
            }
            break;
          default:
        }
        if (key in errors) {
          break;
        }
      }
    }
    return errors;
  }

  private static isRequired(
    data: { [field: string]: any },
    key: string
  ): boolean {
    if (!(key in data)) {
      return false;
    }
    if (typeof data[key] === "string" && validator.isEmpty(data[key])) {
      return false;
    }
    if (data[key] === null) {
      return false;
    }
    if (data[key] === undefined) {
      return false;
    }
    return true;
  }

  private static isString(
    data: { [field: string]: any },
    key: string
  ): boolean {
    if (!(key in data)) {
      return true;
    }
    if (typeof data[key] === "string") {
      return true;
    }
    return false;
  }

  private static isBoolean(
    data: { [field: string]: any },
    key: string
  ): boolean {
    if (!(key in data)) {
      return true;
    }
    if (typeof data[key] === "boolean") {
      return true;
    }
    if (typeof data[key] === "string" && validator.isBoolean(data[key])) {
      return true;
    }
    return false;
  }
}
