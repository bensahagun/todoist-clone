import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase';
import { addTask, addTaskAsync, fetchTasksAsync } from './tasksSlice';
import moment from 'moment';

export default function Tasks() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   db.collection('tasks').onSnapshot((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       const task = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       dispatch(addTask(task));
  //     });
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(
            addTaskAsync({
              dateCreated: moment().format('MM/DD/YYYY'),
              title: 'This is a video',
              projectId: 1,
              userId: 'BcwG2ysWo37vag',
            })
          );
        }}>
        Async Add
      </button>
      <button
        onClick={() => {
          dispatch(fetchTasksAsync());
        }}>
        Fetch
      </button>
    </div>
  );
}
