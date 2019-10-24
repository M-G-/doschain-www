import Link from 'next/link'
import BasicLayout from '../components/BasicLayout'
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, InputNumber, Input, Icon, Switch, Spin, Table, Modal, Tooltip } from 'antd';
import { i18n, withTranslation } from '../i18n'
import axios from '../utils/axios'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const apiRoot = 'http://api.m.doschain.org/monitoring';

class Homepage extends React.Component{

  static async getInitialProps () {
    return {
      namespacesRequired: ['common'],
    }
  }

  componentDidMount() {
    this.getBtcPrice();
    this.getList();
  }

  getBtcPrice = () =>{
    this.setState({aData: null})

    // axios.get('https://blockchain.info/ticker').then(({data}) =>{
    axios.get(`${location.origin}/huobi_api/market/history/trade?symbol=btcusdt&size=1`).then(({data: _data}) =>{
      // const {data}
      const {status, data} = _data
      console.log(data)
      if(status === 'ok'){
        this.setState({currentPrice: data[0].data[0].price})
      }

    }, (e) => {
      console.log('e: ', e)
    })
  }

  getList = () => {
    axios.get(`${apiRoot}/warn/get-price`).then(({data: _data}) =>{
      console.log(_data)
      const {data, errno, errmsg} = _data

      if(errno === 0) {
        this.setState({dataSource: (()=>{
          return (data.price || []).map(item => ({
            key: `${parseInt(`${Math.random() * 1e10}`)}`,
            amount: item,
            status: 0
          }))
          })()})
      }
    })
  }

  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  state = {
    currentPrice: null,
    editKey: -1,
    loading: false,
    dataSource: []
  }

  addItem = () => {
    this.getList()
  }

  deleteItem = (amount) => {
    axios.get(`${apiRoot}/warn/del-price?price=${amount}`).then(({data: _data}) =>{
      console.log(_data)
      const {data, errno, errmsg} = _data

      if(errno === 0) {
        this.getList()
      }
    })
  }

  render(){
    const {t} = this.props
    const {dataSource, currentPrice} = this.state

    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    // const numberError = isFieldTouched('number') && getFieldError('number');

    const columns = [
      {
        title: '金额（$）',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (status, {amount}) => (
          <Button type='danger' size='small' onClick={()=> {
            this.deleteItem(amount)
          }}>删除</Button>
        ),
      },
    ];

    return(
      <BasicLayout title={t('h1')}>

        <div style={{marginTop: 20, fontSize: 24, height: 50}}>
          BTC价格:&nbsp;
          {currentPrice === null
            ? <Spin style={{marginLeft: 10}} />
            : (
              <Tooltip placement='bottom' title='点击刷新'>
                  <span style={{cursor: 'pointer'}} onClick={this.getBtcPrice}>
                    ${currentPrice}
                  </span>
              </Tooltip>
            )
          }
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <p style={{marginTop: 15}} />
        <Button type='primary' onClick={()=>{
          // this.setState(({dataSource})=>{
          //   const key = `${parseInt(Math.random() * 1e10)}`
          //   dataSource.push({
          //     key,
          //     amount: '',
          //     status: 0
          //   },)
          //
          //   return {
          //     editKey: key,
          //     dataSource
          //   }
          // })
          this.addModal.showModal()

        }}><Icon type='plus' /> 添加</Button>
        <AddModalWidthForm
          wrappedComponentRef={(ref) => {this.addModal = ref}}
          addItem={this.addItem}
        />
      </BasicLayout>
    );
  }
}

class AddModal extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  state = {
    visible: false,
    confirmLoading: false,
    number: 0
  };

  showModal = () => {
    this.setState({
      visible: true,
    },() => {
      this.input && this.input.focus()
    });
  };

  handleOk = () => {
    const { form } = this.props;
    form.validateFields((err, {number}) => {
      if (err) {
        return;
      }

      const value = parseInt(number);
      if(isNaN(value) || value <=0) {
        console.log('请输入大于0的数字')
        this.props.form.setFields({
          number: {
            errors: [new Error('请输入大于0的数字')],
          },
        });
        return;
      }

      this.setState({
        confirmLoading: true,
      });
      // setTimeout(() => {
      //
      // }, 2000);
      axios.get(`${apiRoot}/warn/price?price=${value}`).then(({data: _data}) =>{
        console.log(_data)
        const {data, errno, errmsg} = _data

        if(errno === 0) {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.props.addItem(value);
          form.resetFields();
        }else{
          // this.setState({
          //   visible: false,
          //   confirmLoading: false,
          // });
        }
        // this.setState({aData: data})
      })
    });

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading} = this.state;

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const numberError = isFieldTouched('number') && getFieldError('number');

    return (
      <Modal
        title='添加预警价格'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        okText='添加'
        cancelText='取消'
        okButtonProps={{disabled: hasErrors(getFieldsError())}}
      >
        <Form layout='vertical' hideRequiredMark>
          <Form.Item
            label='预警价格（$）'
            validateStatus={numberError ? 'error' : ''}
            help={numberError || ''}
          >
            {getFieldDecorator('number', {
              rules: [
                { required: true, message: '请输入预警价格' },
                { pattern: /^\d*\.?\d*$/, message: '请输入正确的价格' },
              ],
            })(
              <Input ref={(ref)=>{this.input = ref}} autoFocus/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const AddModalWidthForm = Form.create({ name: 'add_item' })(AddModal)
export default withTranslation('index')(Homepage)