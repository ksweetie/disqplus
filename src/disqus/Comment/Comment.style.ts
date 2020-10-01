export const wrapper = {
  display: "flex",
  fontFamily: "Roboto, sans-serif",

  "& + &": {
    marginTop: 20,
  },

  "& &": {
    marginLeft: 20,
  },
};

export const avatar = {
  borderRadius: 5,
  height: 64,
  width: 64,
};

export const body = {
  marginLeft: 12,
};

export const bullet = {
  color: "#c2c6cc",
  padding: "0 5px",
};

export const childrenWrapper = {
  marginBottom: 20,
  marginTop: 20,

  ".comment-container > &": { marginLeft: 76 },
  ".comment-container > & > &": { marginLeft: 76 },
  ".comment-container > & > & > &": { marginLeft: 76 },
  ".comment-container > & > & > & > &": { marginLeft: 76 },
  ".comment-container > & > & > & > & > &": { marginLeft: 76 },
};
