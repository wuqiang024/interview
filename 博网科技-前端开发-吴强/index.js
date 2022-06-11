/*
 * @Author: wuqiang
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: wuqiang
 * @LastEditTime: 2022-06-11 15:09:12
 */

/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (excludesArray = [], targetArray = []) => {
  return targetArray.filter(item => {
    excludesArray.forEach(exclude => {
      delete item[exclude]
    })
    return true;
  })
};
exports.excludeByProperty = (key, targetArray) => {
  return targetArray.filter(item => {
    return !item.hasOwnProperty(key); // 这里如果是只判断属性是否存在的话可以，如果是判断boolean值的话可改为 return !item[key];
  })
};
exports.sumDeep = (targetArray) => {
  return targetArray.map(item => {
    return { objects: item['objects'].reduce((total, current) => {
      return total + current.val;
    }, 0)}
  })
};
exports.applyStatusColor = (colorsObject, targetArray) => {
  const statusColor = {}; // {'404': 'red', '200': 'green'}
  Object.keys(colorsObject).forEach(color => {
    colorsObject[color].forEach(status => {
      statusColor[status] = color;
    })
  });

  return targetArray.filter(filtered => {
    return statusColor.hasOwnProperty(filtered.status);
  }).map(item => {
    return {color: statusColor[item.status], ...item}
  })
};

exports.createGreeting = (fn, message) => {
  return name => {
    return fn(message, name)
  }
};
exports.setDefaults = (defauts) => {
  return origins => {
    return {...defauts, ...origins }
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
