import React from 'react';
import { connect } from 'dva';
import styles from './Apps.less';
import {  Link } from 'dva/router';
import { Button, Affix, Icon, Table, Tag } from 'antd'
import Create from '../components/App/Create'


const columns = [
  {
    title: "Id",
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    render: id => <Link to={`apps/${id}`}>{id}</Link>,
    width: '10%',
    key:'id'
  }, {
    title: 'Name',
    dataIndex: 'name',
    render: name => name && name["zh-CN"],
    width: '10%',
    key: 'name'
  },{
    title: "author",
    dataIndex: 'author',
    width: '10%',
  },{
    title: "category",
    dataIndex: 'category',
    width: '10%',
  },{
    title: "homepage",
    dataIndex: 'homepage',
    render: homepage => <a href={homepage} target="_blank">{homepage}</a>,
    width: '10%',
  },{
    title: "released_at",
    dataIndex: 'released_at',
    sorter: true,
    width: '10%',
    key:'released_at'
  }, {
    title: "Updated_at",
    dataIndex: 'updated_at',
    sorter: true,
    width: '10%',
    key:'updated_at'
  },
]

function Apps({children, dispatch, isCreate, isSubmit, apps}) {

  const CreateProps = {
    visible: isCreate,
    isLoading: isSubmit,
    onCancel: () => dispatch({ type: 'App/onCancel'}),
    onCreate: () => dispatch({ type: 'App/onCreate'}),
    onSubmit: (payload) => dispatch({ type: 'App/create', payload}),
  }

  const CreateButtonProps = {
    onClick: () => dispatch({ type: 'App/onCreate'}),
    className: styles.CreateBtn,
    shape: "circle",
    type: "primary",
    size: "large",
  }

  const TableProps = {
    columns,
    dataSource: Object.values(apps)
  }


  return (
    <div className={styles.normal}>

      <Table {...TableProps}/>

      <Affix style={{ position: 'absolute', bottom: 50, right: 50}}>
        <Button {...CreateButtonProps} >
          <Icon type="plus" />
        </Button>
      </Affix>

      <Create {...CreateProps}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    Apps: { apps },
    App: { isCreate, isSubmit },
  } = state
  return {
    apps,
    isCreate,
    isSubmit
  };
}

export default connect(mapStateToProps)(Apps);
