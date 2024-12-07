import React, { useState } from 'react'
import { Button, Space, Input, Modal} from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const TopicList: React.FC = () => {
  const [topics] = useState(["234243"])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [inputValueAdd, setInputValueAdd] = useState('')
  const [inputValueDelete, setInputValueDelete] = useState('')
  const showModalAdd = () => {setVisibleAdd(true)}
  const handleCancelAdd = () => {setVisibleAdd(false)}
  const addValue = () => {
    if (inputValueAdd != '' && !topics.includes(inputValueAdd)){
      topics.push(inputValueAdd)
    }
    setVisibleAdd(false)

  }
  const [visibleDelete, setVisibleDelete] = useState(false)
  const handleCancelDelete = () => {setVisibleDelete(false)}
  const showModalDelete = () => {setVisibleDelete(true)}
  const deleteValue = () => {
    if (topics.includes(inputValueDelete)){
      topics.splice(topics.indexOf(inputValueDelete),1)
    }
    setVisibleDelete(false)
  }
  return (
  <Space size={[12, 20]} wrap>
    {new Array(topics.length).fill(null).map((_, index) => (
      <Button key={index} style={{minWidth: '12vw', minHeight: '6vh'}}>{topics[index]}</Button>
    ))}
    <Button onClick={showModalAdd} style={{minWidth: '6vw', minHeight: '6vh'}} icon={<PlusOutlined />}>
    </Button>
    <Button onClick={showModalDelete} style={{minWidth: '6vw', minHeight: '6vh'}} icon={<MinusOutlined />}>
    </Button>
    <Modal title="Введите название нового интереса" visible={visibleAdd} onOk={addValue} onCancel={handleCancelAdd}>
      <Input value={inputValueAdd} onChange={(e) => setInputValueAdd(e.target.value)} />
    </Modal>
    <Modal title="Вы уверены, что хотите удалить?" visible={visibleDelete} onOk={deleteValue} onCancel={handleCancelDelete}>
      <Input value={inputValueDelete} onChange={(e) => setInputValueDelete(e.target.value)} />
    </Modal>
  </Space>
  )
}

export default TopicList;