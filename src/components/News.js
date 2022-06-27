import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
    constructor(){
        super();
        console.log("Hello i am a constructor from news component")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
      console.log("cdm");
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=97daee734ccb437fa9becb502015c7fa&page=1&pageSize=20";
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }
    
    handlePrevClick= async ()=>{
      console.log('Previous');

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=97daee734ccb437fa9becb502015c7fa&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      
      this.setState({        
        page: this.state.page - 1,
      })
    }

    handleNextClick= async ()=>{
      console.log('Next');
      if (this.state.page + 1>Math.ceil(this.state.totalResults/20)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=97daee734ccb437fa9becb502015c7fa&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        this.setState({        
          page: this.state.page + 1,
        })
      }
    }

  render() {
    return (
        <div className="container my-3">
            <h2 className="text-center my-3">NewsMonkey Top Headline</h2>
            <div className="row">
            {this.state.articles.map((element)=>{         
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>

            })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr; </button>
            </div>
        </div>
    )
  }
}

export default News;
