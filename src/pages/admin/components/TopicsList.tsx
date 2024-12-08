import { useState, useEffect } from 'react'; 
import { Button, Space, Input, Modal, Card } from 'antd'; 
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'; 
import { supabase } from '../../../shared/supabaseClient'; 
 
function TopicList() { 
  const [data, setData] = useState<Array<{ id: number; title: string }>>([]); 
  const [visibleAdd, setVisibleAdd] = useState(false); 
  const [inputValueAdd, setInputValueAdd] = useState(''); 
 
  const [visibleDelete, setVisibleDelete] = useState(false); 
  const [deleteId, setDeleteId] = useState<number | null>(null); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      const { data, error } = await supabase.from('topics').select(); 
      if (error) { 
        console.error('Ошибка при получении данных:', error); 
      } else { 
        setData(data); 
      } 
    }; 
    fetchData(); 
  }, []); 
 
  const showModalAdd = () => { setVisibleAdd(true); }; 
  const handleCancelAdd = () => { setVisibleAdd(false); }; 
   
  const addValue = async () => { 
    if (inputValueAdd) { 
      const { data: newTopic, error } = await supabase 
        .from('topics') 
        .insert([{ title: inputValueAdd }]) 
        .single(); 
 
      if (error) { 
        console.error('Ошибка при добавлении топика:', error); 
      } else { 
        setData(prevData => [...prevData, newTopic]); 
        setInputValueAdd(''); 
        window.location.reload();
      } 
      
    } 
    setVisibleAdd(false); 
  }; 
 
  const showModalDelete = (id: number) => { 
    setDeleteId(id); 
    setVisibleDelete(true); 
  }; 
 
  const handleCancelDelete = () => { setVisibleDelete(false); }; 
 
  const deleteValue = async () => { 
    if (deleteId !== null) { 
      const { error } = await supabase 
        .from('topics') 
        .delete() 
        .eq('id', deleteId); 
 
      if (error) { 
        console.error('Ошибка при удалении топика:', error); 
      } else { 
        setData(prevData => prevData.filter(topic => topic.id !== deleteId)); 
      } 
    } 
    setVisibleDelete(false); 
  }; 
 
  return ( 
    <div style={{fontSize: 20}}> 
      <Space size={[12, 20]} wrap> 
        
        {data.map(topic => ( 
          <Card 
            key={topic.id} 
            title={topic.title} 
            extra={<Button onClick={() => showModalDelete(topic.id)} icon={<MinusOutlined />} />} 
            style={{ width: 250, marginBottom: 16, marginLeft: 16 }} 
          > 
          </Card>
        ))} 
      </Space>
      <Button onClick={showModalAdd} style={{ minWidth: '12vw', minHeight: '8vh', marginLeft: '15px', marginTop: '15px', fontSize: '17px' }} icon={<PlusOutlined />}> 
        Добавить 
      </Button> 
      <Modal title="Введите название нового интереса" visible={visibleAdd} onOk={addValue} onCancel={handleCancelAdd}> 
        <Input value={inputValueAdd} onChange={(e) => setInputValueAdd(e.target.value)} /> 
      </Modal> 
      <Modal title="Вы уверены, что хотите удалить?" visible={visibleDelete} onOk={deleteValue} onCancel={handleCancelDelete}> 
      </Modal> 
    </div> 
  ); 
} 
 
export default TopicList;
