// https://www.eatthis.com/kitchen-hacks-cooking-tips/
import React from "react";
import Article from "../Articles.json";
import "./Articles.css";
import { Link } from "react-router-dom";

function Articles() {
    return (
        <div className="main">
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <h1 className="head">Cooking Tricks & Tips</h1>
            <div className="display">
                {Article.map((article) => (
                    <div key={article.Id} className="articles" >
                         <h2>{article.Id} . {article.Title} </h2>
                        <img src={article.Image} alt={article.Title} />
                       
                        <p>{article.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Articles;