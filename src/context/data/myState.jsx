import React from 'react'
import MyContext from './myContext'

function myState(props) {
  const state={
    name:'akhil',
    age: 19
  }
  return (
    <MyContext.Provider value={state}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState