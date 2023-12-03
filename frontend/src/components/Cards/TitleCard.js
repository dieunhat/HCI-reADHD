import Subtitle from "../Typography/Subtitle"
import Title from "../Typography/Title"
import React from "react";
  
  function TitleCard({id, title, children, topMargin, TopSideButtons}){


      return(
          <div id={id} className={"card w-full p-6 bg-base-100 max-md:shadow-md md:shadow-lg " + (topMargin || "mt-6")}>

            {/* Title for Card */}
              <Title styleClass={TopSideButtons ? "inline-block card-title" : "card-title"}>
                  <p className={'title-text inline-block'}>{title}</p>

                {/* Top side button, show only if present */}
                {/*  Handle click*/}
                {
                    TopSideButtons && <div className="card-action inline-block float-right">
                        <button className="btn btn-sm btn-primary text-info" >
                            {TopSideButtons}
                        </button>
                    </div>

                }
              </Title>
              
              <div className="divider mt-2"></div>
          
              {/** Card Body */}
              <div className='w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCard