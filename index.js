const { users } = require("./__tests__/__helpers__/p7");

/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (excludes = [], array = []) => {
  return array.map(objects => {
    let entries = Object.entries(objects).filter(item => {
      return !excludes.includes(item[0])
    });
    return Object.fromEntries(entries)
  })
};

exports.excludeByProperty = (prop, array) => {
  return array.filter(item => {
    return !item.hasOwnProperty(prop)
  })
};

exports.sumDeep = (array) => {
  let calculate = elements => {
    return elements.reduce((total, cur) => {
      return total + cur.val
    }, 0)
  };

  return array.map(item => {
    return {objects: calculate(item.objects)}
  })
};

exports.applyStatusColor = (colorObject, statusArray) => {
  let _colors = {};
  Object.keys(colorObject).forEach(colorName => {
    colorObject[colorName].forEach(status => {
      _colors[status] = colorName
    })
  });
  let _filters = statusArray.filter(item => {
    return _colors.hasOwnProperty(item.status);
  });
  return _filters.map(item => {
    return {
      ...item,
      color: _colors[item.status]
    }
  })
};

exports.createGreeting = (fn, param) => {
  return (input) => {
    return fn(param, input)
  }
};

exports.setDefaults = (defaultParam) => {
  return param => {
    return {...defaultParam, ...param}
  }
};

exports.fetchUserByNameAndUsersCompany = (name, services) => {
  let {fetchStatus, fetchUsers, fetchCompanyById} = services;
  return Promise.all([fetchStatus(), fetchUsers()]).then(([status, users]) => {
    let user = users.find(item => {
      return item.name === name;
    });
      return fetchCompanyById(user.companyId).then(company => {
        return {
          company,
          status,
          user
        }
      })
  })
};
