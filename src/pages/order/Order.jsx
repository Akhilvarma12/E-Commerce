import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'

function Order() {
  const context=useContext(myContext)

  return (
    <Layout>ordered by {context.name}</Layout>
  )
}

export default Order