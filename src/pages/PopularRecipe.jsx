import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./PopularRecipe.css"

const PopularRecipe = () => {
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);

    // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5
    useEffect(() => {
        const data2 = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=da1d576ade9846be99f6a854ae590ac0`);
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result.recipes)
                setData(result.recipes)
            } catch (err) {
                setErr(err.message);
            }
        }; data2();
    }, [])

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <h1>Popular Recipe</h1>
            <div className='Display_P'>
                {err && <h3>{err}</h3>}
                {data.map((data1, index) => {
                    return (
                        <div key={index} className="P_RecipesList">
                            <img src={data1.image}  alt={data1.title} />
                            <Link to={data1.spoonacularSourceUrl}>
                                <h3>{data1.title}</h3>
                            </Link>
                            <p>Cooking Time :-  {data1.readyInMinutes} mintues</p>
                            <p>Serving :-  {data1.servings} person</p>
                            {/* {data1.instructions} */}

                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default PopularRecipe;