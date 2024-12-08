
import { Card, Button, Input, Col, Row, message } from 'antd'; 
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
 
  useEffect(() => { 
    fetchPlaces();  
  }, []); 
 
  return ( 
    <div> 
      <PlacesVidg wkbString={"0101000020E61000007B88467710834B4023D923D40C535240"}/> 
      <Row gutter={16} > 
        <Col span={8} style={{ marginTop: '10%',  }}> 
          <AddPlaceCard onAdd={handleAddPlace} /> 
        </Col> 
      </Row>  
      
      <div style={{ marginTop: '20px',  }}> 
        <h1>Список мест:</h1> 
        {places.map((place) => ( 
          <Card key={place.id} style={{ margin: '10px 0',  }}> 
            <h2 style={{marginLeft: '35%'}}>{place.title}</h2> 
            <p style={{marginLeft: '35%'}}>{place.location}</p> 
            <Button 
              danger 
              style={{marginLeft: '45%'}}
              onClick={() => handleDeletePlace(place.id)} 
            > 
              Удалить 
            </Button>
          </Card> 
        ))} 
      </div> 
    </div> 
  ); 
}; 
export default TopicsList;