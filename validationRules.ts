const emailRules = [
  (v: any) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const onlyCharacterRule = [
  (v:any) => !!v || "field is required",
  (v:any) => /^[A-Za-z ]+$/.test(v) || 'Only characters allowed.'
]

const nameRules = [
  (v: any) => !!v || "Name is required",
  (v: any) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

const allowSpaceRule = [
  (v: any) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
];

const TelephoneNumberRule = [
  (v: any) => !!v || "Number is required",
  (v: string) => /^\s*|[0-9][0-9]*/.test(v) || "contact must be valid",
  (v: any) =>
    (v && v.length <= 12) || "contact must be 10 or maximum 12 characters",
];

export { emailRules, onlyCharacterRule, nameRules, allowSpaceRule, TelephoneNumberRule };
