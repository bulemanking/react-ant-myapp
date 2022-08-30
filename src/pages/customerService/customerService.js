import styles from './customerService.less'; // 引入页面样式文件

import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Table, Pagination } from 'antd'; // 引入antd组件

import { getAiServiceList } from '@/services/ant-design-pro/customer'; // 引入接口

export default () => {
  /**
   * input 输入 相关
   * @param {*} e
   */
  const inputChange = (e) => {
    // 改变输入框的值
    setInputValue(e.target.value);

    // 改变搜索条件
    setParams({
      ...params,
      student_name: e.target.value,
    });
    // 模拟清空
    if (e.target.value == '') {
      console.log('我是清空操作');
    }
  };
  const [inputValue, setInputValue] = useState(''); // input输入框的值

  /**
   * select下拉框 相关
   */
  const { Option } = Select;
  const [state_options, setState_options] = useState([
    {
      value: 'REPLIED',
      label: '未回复',
    },
    {
      value: 'ANSWER',
      label: '已回复',
    },
  ]);
  const listItem = state_options.map((item) => {
    return (
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    );
  });
  const stateChange = (value) => {
    // 选择下拉框的值
    setSelectValue(value);
    // 改变搜索条件
    setParams({
      ...params,
      status: value,
    });
  };
  const [selectValue, setSelectValue] = useState(''); // select下拉框的值

  /**
   * 顶部按钮 相关
   */
  const [params, setParams] = useState({
    student_name: '',
    page: 1,
    status: '',
  });
  /**
   * 搜索
   */
  const searchTable = () => {
    console.log('搜索');
    setIsLoading(true);
    getAiServiceList(params).then((res) => {
      setTableData(res.data.results);
      setTotal(res.data.count);
      setIsLoading(false);
    });
  };
  /**
   * 刷新 重置
   */
  const resetTable = () => {
    console.log('重置');
    // 重置请求参数
    setParams({
      ...params,
      student_name: '',
      page: 1,
      status: '',
    });
    // 重置 输入框值
    setInputValue('');
    // 重置 下拉框值
    setSelectValue('');
    // 重置 表格数据 不带参数
    getTableData();
  };

  /**
   * 表格 相关 表格列
   */
  const [columns, setColumns] = useState([
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
  ]);

  /**
   * 页面初始化数据 相关
   */
  const [tableData, setTableData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getTableData = () => {
    setIsLoading(true);
    getAiServiceList().then((res) => {
      setTableData(res.data.results);
      setTotal(res.data.count);
      setIsLoading(false);
    });
  };
  /**
   * 分页
   */
  const [total, setTotal] = useState(0);
  const handlePage = (current, size) => {
    params.page = current;
    searchTable();
  };

  /**
   * useEffect 相当于vue的created 和 mounted 钩子 一般用于请求数据 以及初始化数据
   * 以及监听事件 等等 一般不会在这里面写业务逻辑 业务逻辑写在其他函数里面 然后在这里面调用
   */
  useEffect(() => {
    getTableData();
    return () => {
      /**
       * 就是这个 return 相当于vue的beforeDestroy unmount 钩子相关
       * 一般用于清除监听事件 等等 一般不会在这里面写业务逻辑 业务逻辑写在其他函数里面 然后在这里面调用
       */
      console.log('人工客服页面卸载了');
    };
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
              allowClear
              value={inputValue}
            />
          </div>
          <div className={styles.ipt_item}>
            <span className={styles.ser_title}>状态：</span>
            <Select
              className={styles.ser_content}
              onChange={stateChange}
              allowClear
              value={selectValue}
            >
              {listItem}
            </Select>
          </div>
          <div className={styles.ipt_item}>
            <Button type="primary" onClick={searchTable} style={{ marginRight: '10px' }}>
              搜索
            </Button>
            <Button onClick={resetTable}>重置</Button>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table loading={isLoading} columns={columns} dataSource={tableData} pagination={false} />
          <div className={styles.page}>
            <Pagination total={total} showSizeChanger={false} onChange={handlePage} />
          </div>
        </div>
      </div>
    </>
  );
};
