const sucessWithdata = (code, message, data) => {
  return (response = {
    statuscode: code,
    message,
    data,
  });
};

const successwithoutdata = (code, message) => {
  return (response = {
    statuscode: code,
    message,
  });
};

const errorresponse = (code, message, err) => {
  return (response = {
    statuscode: code,
    message,
    description: err,
  });
};

module.exports = { sucessWithdata, successwithoutdata, errorresponse };
