import Link from 'next/link'
import BasicLayout from '../components/BasicLayout'
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, InputNumber, Input, Icon, Switch, Table } from 'antd';
import { i18n, withTranslation } from '../i18n'
import axios from '../utils/axios'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Homepage extends React.Component{

  static async getInitialProps () {
    const {data} = await axios.get('https://blockchain.info/ticker')

    return {
      namespacesRequired: ['common'],
      aData: data
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  state = {
    number: 1000,
    editKey: -1,
    dataSource: [
      {
        key: '1',
        amount: 5000,
        status: 1
      },
      {
        key: '2',
        amount: 6000,
        status: 0
      },
      {
        key: '3',
        amount: 7000,
        status: 0
      },
    ]
  }

  onChange = (value) => {
    console.log('changed', value);
  }

  render(){
    const {aData, t} = this.props
    const {dataSource, editKey} = this.state

    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    // const numberError = isFieldTouched('number') && getFieldError('number');

    const columns = [
      {
        title: '金额（$）',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount, {key}) => (
          key === editKey
            ? <div><InputNumber
              min={0}
              onChange={this.onChange}
              onBlur={()=>{
                this.setState({editKey: -1})
              }}
              defaultValue={amount}
              autoFocus
              style={{width: 180}} /></div>
            : <div onClick={() => {
              this.setState({editKey: key})
            }} style={{cursor: 'pointer'}} title='修改'>{amount}</div>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <Switch checked={status === 1} />
        ),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (status) => (
          <Button type='danger' size='small'>删除</Button>
        ),
      },
    ];

    return(
      <BasicLayout title={t('h1')}>

        <p style={{marginTop: 20}}>BTC价格: ${aData.USD.last} / ¥{aData.CNY.last}</p>
        <p style={{marginTop: 15}} />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <p style={{marginTop: 15}} />
        <Button type='primary' onClick={()=>{
          this.setState(({dataSource})=>{
            const key = `${parseInt(Math.random() * 1e10)}`
            dataSource.push({
              key,
              amount: '',
              status: 0
            },)

            return {
              editKey: key,
              dataSource
            }
          })

        }}><Icon type='plus' /> 添加</Button>
        {/*<Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item validateStatus={numberError ? 'error' : ''} help={numberError || ''}>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Please input BTC amount!' }],
            })(
              <InputNumber
                min={0}
                onChange={this.onChange}
                formatter={value => `$ ${value}`}
                style={{width: 180}} />
            )}
          </Form.Item>

          <Form.Item>
            <Switch defaultChecked onChange={this.onChange} />
          </Form.Item>
        </Form>*/}
      </BasicLayout>
    );
  }
}

export default withTranslation('index')(Form.create({ name: 'horizontal_login' })(Homepage))