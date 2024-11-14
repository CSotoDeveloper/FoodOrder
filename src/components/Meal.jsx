import React, { useState, useEffect } from 'react'
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
import MealItem from './MealItem';

const requestConfig = {}

const Meal = () => {
    const {
        data: loadedMeals, 
        isLoading, 
        error
    }= useHttp("http://localhost:4000/meals", requestConfig, [])

    if (isLoading) {
        return <p className='center'>Fetching Meals...</p>
    }

    if (error) {
        return <ErrorPage title="Failed to fetch meals" message={error}/>
    }

  return (
    <ul id='meals'>
        {loadedMeals.map((meal) => ( 
            <MealItem key={meal.id} meal={meal} />
            ))}
    </ul>
  )
}

export default Meal