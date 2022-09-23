import React from 'react';

const Status = (props) => {
  let valueStatus = props.value.length;
  const numberStatus = () => {
    if (valueStatus > 4 && valueStatus < 15) {
      return `${valueStatus} Тусанут с тобой сегодня`;
    }
    if (
      valueStatus === 4 ||
      valueStatus === 3 ||
      valueStatus === 2 ||
      valueStatus === 1
    ) {
      return `${valueStatus} Тусананет с тобой сегодня`;
    }
    if (valueStatus === 0) {
      return `Никто с тобой сегодня не тусанет`;
    }
  };
  return (
    <h1 className={valueStatus > 0 ? `badge bg-primary` : `badge bg-danger`}>
      {numberStatus()}
    </h1>
  );
};

export default Status;
