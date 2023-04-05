import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from "../firebase/firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Recipelist.css";

const Recipelist = () => {
    // const { state } = useLocation();
    // const { id } = state;
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);
    // const list = id.Recipelist;
    const list = [ 62534, 62234]
    const [Saved_R, setsaved_R] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5   49785da206294648950f3afd48bb48ca
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        const Data2 = () => {
            list.map(async (idlist) => {
                // console.log(idlist)
                try {
                    const response = await fetch(`https://api.spoonacular.com/recipes/${idlist}/information?apiKey=3d7009d38e2c4ad8aaa806685013cbd5 `);
                    if (!response.ok) {
                        throw new Error(`Error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    setData((recipe) => [...recipe, result])

                } catch (err) {
                    setErr(err.message);
                }
            });
        }; Data2();
        return () => {
            listen();
        };
    }, [])

    // store
    const S_recipe = (recipe_id) => {
        setsaved_R([recipe_id]);

        if (Saved_R == '' && authUser) {
            toast.warning('Try Again', { autoClose: 1000 })
        }
        else {
            authUser ? (
                push(ref(db, `${auth.currentUser.uid}`), {
                    Saved_R
                })
                    (toast.success("Saved Recipe", { autoClose: 1000 }))
            ) : (
                alert("To save recipe you have to login")
            )
        }
    }

    const Vegan = () => {
        setErr("")
        data.map((data1) => {
            if (data1.vegan) {
                console.log(data1.vegan)
                setData("")
                setData((recipe) => [...recipe, data1])
            }
            else setErr("not found")
        });

    }
    const vegetarian = () => {
        setErr("")
        data.map((data1) => {
            if (data1.vegetarian) {
                setData("")
                setData((recipe) => [...recipe, data1])
            }
            else setErr("not found")
        });
    }
    const cooktime = () => {
        setErr("")
        data.map((data1) => {
            if (data1.readyInMinutes < 60) {
                console.log(data1.readyInMinutes)
                setData("")
                setData((recipe) => [...recipe, data1])
            }
            else setErr("not found")
        });
    }
    const AllRecipe = () => {
        setErr("")
        list.map(async (idlist) => {
            // console.log(idlist)
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${idlist}/information?apiKey=3d7009d38e2c4ad8aaa806685013cbd5 `);
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                const result = await response.json();
                setData((recipe) => [...recipe, result])

            } catch (err) {
                setErr(err.message);
            }
        });
    };

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className="filter">
                <button onClick={vegetarian}>vegetarian</button>
                <button onClick={Vegan}>Vegan</button>
                <button onClick={cooktime}>Cook time &lt; 60</button>
                <button onClick={AllRecipe}>Remove filter</button>
            </div>
            <hr/>
            <div className='Display_R'>
                {err ? <h3>{err}</h3> : (data.length == 0 ? "Recipe Not found" : "")}
                    {data.map((data1, index) => {
                        return (
                            <div key={index} className="RecipesList">
                                <button onClick={() => S_recipe(data1.id)} className="Save">Save</button>
                                <img src={data1.image} alt={data1.title} />
                                <Link to={data1.spoonacularSourceUrl}>
                                    <h3 >{data1.title}</h3>
                                </Link>
                                <p>Cooking Time :-  {data1.readyInMinutes} mintues</p>
                                <p>Serving :-  {data1.servings} person</p>
                            </div>
                        )
                    })}
                {/* } */}

            </div>
        </>
    )
}
export default Recipelist;