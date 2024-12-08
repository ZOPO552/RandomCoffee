import { Card, Button, Input, Col, Row, message } from 'antd';  
import { useState, useEffect } from 'react';  
import { supabase } from '../../../shared/supabaseClient';   
 
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
 
  const fetchPlaces = async () => {  
    const { data, error } = await supabase.from('places').select('*');  
    if (error) {  
      message.error('Ошибка при загрузке мест: ' + error.message);  
      return;  
    }  
    setPlaces(data);  
  };  
 
  const handleAddPlace = async (title: string, location: string) => {  
    const { data, error } = await supabase  
      .from('places')  
      .insert([{ title, location }]); 
 
    if (error) {  
      message.error('Ошибка при добавлении места: ' + error.message);  
      throw new Error(error.message);  
    }  
 
    if (data && data.length > 0) { 
      setPlaces((prevPlaces) => [...prevPlaces, { id: data[0].id, title, location }]);  
    } 
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
 
  useEffect(() => {  
    fetchPlaces();  
  }, []);  
 
  return (  
    <div>  
      <div> {} 
        <Row gutter={16}>  
          <Col span={8}>  
            <AddPlaceCard onAdd={handleAddPlace} />  
          </Col>  
        </Row>  
        <div style={{ marginTop: '20px' }}>  
          <h3>Список мест:</h3>  
          {places.map((place) => (  
            <Card key={place.id} style={{ margin: '10px 0' }}>  
              <h4>{place.title}</h4>  
              <p>{place.location}</p>  
              <Button  
                danger  
                onClick={() => handleDeletePlace(place.id)}  
              >  
                Удалить  
              </Button>  
            </Card>  
          ))}  
        </div>  
      </div> {} 
    </div>  
  );  
};  
 
export default TopicsList;