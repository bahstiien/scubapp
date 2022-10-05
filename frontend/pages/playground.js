import React from 'react';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

const Playground = (props) => {
  return (
    <>
      <h2 className=" text-5xl"> Hello World</h2>

      <p> lorem*12</p>
      <Space direction="vertical" size={12}>
        <DatePicker
          bordered={false}
          showTime
          showNow
          minuteStep={15}
          showSecond={false}
          format="YYYY-MM-DD HH:mm"
          minDate={new Date()}
        />

        <DatePicker
          disabledDate={(d) =>
            !d || d.isAfter('2025-12-31') || d.isSameOrBefore('2022-10-05')
          }
        />
      </Space>
    </>
  );
};

export default Playground;
