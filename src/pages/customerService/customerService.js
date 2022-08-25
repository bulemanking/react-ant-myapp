import styles from './customerService.less'; // 引入页面样式文件

import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Table } from 'antd'; // 引入antd组件

import { getAiServiceList } from '@/services/ant-design-pro/customer'; // 引入接口

export default () => {
  // input 输入 相关
  const [ser, setSer] = useState(''); // 搜索框
  const inputChange = (e) => {
    setSer(e.target.value);
  };

  // select下拉框 相关
  const { Option } = Select;
  const state_options = [
    {
      value: 'REPLIED',
      label: '未回复',
    },
    {
      value: 'ANSWER',
      label: '已回复',
    },
  ];
  const listItem = state_options.map((item) => {
    return (
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    );
  });
  const [state, setState] = useState('');
  const stateChange = (value) => {
    setState(value);
  };

  // 搜索 相关
  const searchTable = () => {
    console.log('搜索');
    let params = {
      student_name: ser,
      page: 1,
      status: state,
    };
    setIsLoading(true);
    getAiServiceList(params).then((res) => {
      setTableData(res.data.results);
      setIsLoading(false);
    });
  };

  // 表格 相关
  const columns = [
    {
      title: '留言',
      dataIndex: 'content',
      key: 'content',
      render: (id) => <a>{id}</a>,
    },
    {
      title: '留言学生',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最后留言时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // mounted 相关
  // 相当于vue的created 和 mounted 钩子 一般用于请求数据 以及初始化数据
  // 以及监听事件 等等 一般不会在这里面写业务逻辑 业务逻辑写在其他函数里面 然后在这里面调用
  const [tableData, setTableData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAiServiceList().then((res) => {
      if (res.code == 0) {
        setTableData(res.data.results);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>人工客服</h1>
      <div className={styles.table_block}>
        <div className={styles.ser_block}>
          <div className={styles.ipt_item}>
            <span className={styles.ser_title}>留言学生：</span>
            <Input
              className={styles.ser_content}
              placeholder="请输入"
              onChange={inputChange}
              showCount
            />
          </div>
          <div className={styles.ipt_item}>
            <span className={styles.ser_title}>状态：</span>
            <Select className={styles.ser_content} onChange={stateChange}>
              {listItem}
            </Select>
          </div>
          <div className={styles.ipt_item}>
            <Button type="primary" onClick={searchTable}>
              搜索
            </Button>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table loading={isLoading} columns={columns} dataSource={tableData} />
        </div>
      </div>
    </>
  );
};
