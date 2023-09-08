import React, { useEffect, useState } from 'react';
import './DiffFormProps.css';

function DiffFormProps({ originalObject, modifiedObject }) {
  const [differences, setDifferences] = useState([]);

  useEffect(() => {
    function compareObjects(obj1, obj2, path = '') {
      for (const key in obj1) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (typeof value1 === 'object' && typeof value2 === 'object') {
          compareObjects(value1, value2, `${path}.${key}`);
        } else if (value1 !== value2) {
          const diff = {
            path: `${path}.${key}`,
            key: key,
            oldValue: value1,
            newValue: value2,
          };
          console.log(differences)
          setDifferences((prevDifferences) => [...prevDifferences, diff]);
          console.log(differences)
        }
      }
    }

    // Calculate differences when the component mounts
    compareObjects(originalObject, modifiedObject);
    console.log('i fire once');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="github-diff">
      <ul>
        {differences.map((diff, index) => (
          <li key={index}>
            <div className="github-diff-line">
              <span className="github-diff-line-num">{index}</span>
              <span className="github-diff-line-code">
              <h5>{diff.key}</h5>
                <span className="github-diff-line-code-old">{diff.oldValue}</span>
                <span className="github-diff-line-code-new">{diff.newValue}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiffFormProps;