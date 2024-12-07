import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useEffect, useState } from 'react';
import PlacesVidg from './PlacesVidg'

function TopicsList() {
  const [data, setData] = useState(new Array<Object>());


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('places').select();
      console.log(data);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  async function addTopic() {
    await supabase.from('places').insert({ title: 'Скуфатов' });
    // обновление страницы
    //window.location.reload();
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title', },
    {
      title: 'Координаты',
      dataIndex: 'location'
    },
  ];

  return (
    <>
      <Button onClick={addTopic} style={{ marginBottom: '15px' }}>
        Добавить место
      </Button>
      <Table className='right' pagination={false} dataSource={data} columns={columns} />
      <PlacesVidg />
    </>
  );
}

export default TopicsList;
