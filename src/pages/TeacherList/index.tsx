import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    console.log(subject);
    console.log(week_day);
    console.log(time);

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    }).then(response => {
      setTeachers(response.data);
    }).catch(() => {
      alert("Algo deu errado ao processar a solicitação");
    })
  }


  return (
    <div id="page-teacher-list" className="contaienr">
      <PageHeader title="Estes são os Proffys disponívies.">
        <form onSubmit={searchTeachers} id="search-teachers">
        <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Quimica', label: 'Quimica' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Portugues', label: 'Portugues' },
            ]}
          />

        <Select
            name="week-day"
            label="Dia da Semana"
            value={week_day}
            onChange={e => setWeek_day(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sabado' },
            ]}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
