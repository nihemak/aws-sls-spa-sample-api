import { describe, it } from "mocha";
import { assert } from "chai";
import { AssocValidator } from "../../utils/AssocValidator";

describe('AssocValidator', () => {
  describe('#validate', () => {
    describe('required', () => {
      it('should error when key does not exist', () => {
        const assoc = {"key2": "value"};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "required");
      });

      it('should error when empty string', () => {
        const assoc = {"key": ""};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "required");
      });

      it('should error when null', () => {
        const assoc = {"key": null};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "required");
      });

      it('should error when undefined', () => {
        const assoc = {"key": undefined};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "required");
      });

      it('should success when not empty string', () => {
        const assoc = {"key": "foobar"};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });

      it('should success when number', () => {
        const assoc = {"key": 0};
        const rules = {"key": ["required"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });
    });

    describe('string', () => {
      it('should error when number', () => {
        const assoc = {"key": 128};
        const rules = {"key": ["string"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "string");
      });

      it('should success when string', () => {
        const assoc = {"key": "foo"};
        const rules = {"key": ["string"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });

      it('should success when empty string', () => {
        const assoc = {"key": ""};
        const rules = {"key": ["string"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });

      it('should success when key does not exist', () => {
        const assoc = {};
        const rules = {"key": ["string"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });
    });

    describe('boolean', () => {
      it('should error when number', () => {
        const assoc = {"key": 128};
        const rules = {"key": ["boolean"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.equal(errors["key"], "boolean");
      });

      it('should success when boolean', () => {
        const assoc = {"key": true};
        const rules = {"key": ["boolean"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });

      it('should success when string boolean', () => {
        const assoc = {"key": "false"};
        const rules = {"key": ["boolean"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });

      it('should success when key does not exist', () => {
        const assoc = {};
        const rules = {"key": ["boolean"]};

        const errors = AssocValidator.validate(assoc, rules);

        assert.doesNotHaveAnyKeys(errors, ["key"]);
      });
    });
  });
});
