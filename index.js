/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

// ### Problem 1 - stripPrivateProperties - 2 points
exports.stripPrivateProperties = (excludedProps, originArray) => {
  return originArray.map((el) => {
    excludedProps.forEach((prop) => {
      delete el[prop];
    });
    return el;
  });
};

// ### Problem 2 - excludeByProperty - 2 points
exports.excludeByProperty = (key, originArray) => {
  return originArray.filter((el) => !el[key]);
};

// ### Problem 3 - sumDeep - 3 points
exports.sumDeep = (originArray) => {
  return originArray.map((el) => {
    const expectedSum = el.objects.reduce((acc, cur) => {
      return acc + cur.val;
    }, 0);

    return {
      objects: expectedSum,
    };
  });
};

// ### Problem 4 - applyStatusColor - 4 points
// TODO: handle with Set/Map can be better :v
exports.applyStatusColor = (colors = [], inputStatues) => {
  // * Init colorful statues
  let colorfulStatuses = [];
  for (const [color, statues] of Object.entries(colors)) {
    colorfulStatuses = [...colorfulStatuses, ...statues];
  }

  // * Get color by status code
  const getColor = (status) => {
    for (const [color, statues] of Object.entries(colors)) {
      if (statues.includes(status)) return color;
    }
  };

  // * Ignored colorless statues
  inputStatues = inputStatues.filter(({ status }) =>
    colorfulStatuses.includes(status)
  );

  return inputStatues.map((el) => ({ ...el, color: getColor(el.status) }));
};

// ### Problem 5 - createGreeting - 2 points
exports.createGreeting = (greetFn, message) => (name) => greetFn(message, name);

// ### Problem 6 - setDefaults - 3 points
exports.setDefaults = (defaultProps) => (restProps) => ({
  ...defaultProps,
  ...restProps,
});

// ### Problem 7 - fetchUserByNameAndUsersCompany - 5 points
exports.fetchUserByNameAndUsersCompany = async (
  userName,
  { fetchStatus, fetchUsers, fetchCompanyById }
) => {
  try {
    const [status, users] = await Promise.all([fetchStatus(), fetchUsers()]);
    const selectedUser = users.find((user) => user.name === userName);
    const company = await fetchCompanyById(selectedUser.companyId);

    return {
      company,
      status,
      user: selectedUser,
    };
  } catch (error) {
    throw error;
  }
};
