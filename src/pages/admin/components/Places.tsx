import { Card, Button, Input, Col, Row, message, Modal } from 'antd';  
import { useState, useEffect } from 'react';  
import { supabase } from '../../../shared/supabaseClient';  
import PlacesVidg from './PlacesVidg' 
const AddPlaceCard: React.FC<{ onAdd: (title: string, location: string) => void }> = ({ onAdd }) => {  
  const [inputValueAdd, setInputValueAdd] = useState('');  
  const [inputValueLocation, setInputValueLocation] = useState('');  
  const handleAdd = async () => {  
    if (inputValueAdd.trim() && inputValueLocation.trim()) {  
      try {  
        await onAdd(inputValueAdd.trim(), inputValueLocation.trim());  
        setInputValueAdd('');  
        setInputValueLocation('');  
      } catch (error) {  
        console.error('Ошибка при добавлении: ', error);  
      }  
    } else {  
      message.error('Пожалуйста, заполните все поля.');  
    }  
  };  
  return (  
    <Card style={{ width: 300, margin: '16px' }}>  
      <Input  
        placeholder="Название кофейни"  
        value={inputValueAdd}  
        onChange={(e) => setInputValueAdd(e.target.value)}  
      />  
      <Input  
        placeholder="Координаты"  
        value={inputValueLocation}  
        onChange={(e) => setInputValueLocation(e.target.value)}  
        style={{ marginTop: 10 }}  
      />  
      <Button onClick={handleAdd} type="primary" style={{ marginTop: 10 }}>  
        Добавить  
      </Button>  
    </Card>  
  );  
};  
const TopicsList: React.FC = () => {  
  const [places, setPlaces] = useState<{ id: number; title: string; location: string }[]>([]);  
  const [editingPlace, setEditingPlace] = useState<{ id: number; title: string; location: string } | null>(null);  
  const [inputValueEdit, setInputValueEdit] = useState({ title: '', location: '' });  
 
  const fetchPlaces = async () => {  
    const { data, error } = await supabase.from('places').select('*');  
    if (error) {  
      message.error('Ошибка при загрузке мест: ' + error.message);  
      return;  
    }  
    setPlaces(data);  
  };  
  const handleAddPlace = async (title: string, location: string) => {  
    const { error } = await supabase  
      .from('places')  
      .insert([{ title, location }]);   
    if (error) {  
      message.error('Ошибка при добавлении места: ' + error.message);  
      throw new Error(error.message);  
    }  
    await fetchPlaces();  
  };  
  const handleDeletePlace = async (id: number) => {  
    const { error } = await supabase.from('places').delete().eq('id', id);  
    if (error) {  
      message.error('Ошибка при удалении места: ' + error.message);  
    } else {  
      setPlaces(places.filter(place => place.id !== id));  
      message.success('Место успешно удалено!');  
    }  
  };  
  const handleEditPlace = async () => { 
    if (editingPlace) { 
      const { error } = await supabase 
        .from('places') 
        .update({ title: inputValueEdit.title, location: inputValueEdit.location }) 
        .eq('id', editingPlace.id); 
      if (error) { 
        message.error('Ошибка при изменении места: ' + error.message); 
      } else { 
        setPlaces(places.map(place => place.id === editingPlace.id ? { ...place, title: inputValueEdit.title, location: inputValueEdit.location } : place)); 
        message.success('Место успешно изменено!'); 
        setEditingPlace(null); 
        setInputValueEdit({ title: '', location: '' }); 
      } 
    } 
  }; 
  const openEditModal = (place: { id: number; title: string; location: string }) => { 
    setEditingPlace(place); 
    setInputValueEdit({ title: place.title, location: place.location }); 
  }; 
  useEffect(() => {  
    fetchPlaces();   
  }, []);  
  return (  
    <div>  
      <Row gutter={16} >  
        <PlacesVidg latitude={55.028666} longitude={73.284442}/> 
        <Col span={8} style={{ marginTop: '2%', }}>  
          <AddPlaceCard onAdd={handleAddPlace} />  
        </Col>  
      </Row>  
      <div style={{ marginTop: '20px',  }}>  
        <h1>Список мест:</h1>  
        {places.map((place) => (  
          <Card key={place.id}
style={{ margin: '10px 0',  }}>  
            <h2 style={{marginLeft: '35%'}}>{place.title}</h2>  
            <p style={{marginLeft: '35%'}}>{place.location}</p>  
            <Button  
              onClick={() => openEditModal(place)}  
              style={{marginLeft: '45%', marginRight: '5px'}} 
            >  
              Изменить  
            </Button> 
            <Button  
              danger  
              style={{marginLeft: '5%'}} 
              onClick={() => handleDeletePlace(place.id)}  
            >  
              Удалить  
            </Button>  
          </Card>  
        ))}  
      </div>  
      <Modal 
        title="Изменить место" 
        visible={!!editingPlace} 
        onOk={handleEditPlace} 
        onCancel={() => setEditingPlace(null)} 
      > 
        <Input 
          placeholder="Название кофейни" 
          value={inputValueEdit.title} 
          onChange={(e) => setInputValueEdit({ ...inputValueEdit, title: e.target.value })} 
        /> 
        <Input 
          placeholder="Координаты" 
          value={inputValueEdit.location} 
          onChange={(e) => setInputValueEdit({ ...inputValueEdit, location: e.target.value })} 
          style={{ marginTop: 10 }} 
        /> 
      </Modal> 
    </div>  
  );  
};  
export default TopicsList;