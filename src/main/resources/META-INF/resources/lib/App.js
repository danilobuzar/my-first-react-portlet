import React, { Component } from 'react';
import { Container, Row, Col, Card, CardDeck, Button, Form } from 'react-bootstrap';
import {decode as atob, encode as btoa} from 'base-64'

class MyFirstReactPortletApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }	
	
	componentDidMount() {
		this.fetchData();
	}	
	
	fetchData = () => {
		// alterar o site id (35268) antes de fazer a chamada na API
		const apiUrl = "http://localhost:8080/o/headless-delivery/v1.0/sites/35268/blog-postings";
		fetch(apiUrl,
		{
			method: 'GET',
			headers: new Headers({
				Authorization: "Basic " + btoa('test@liferay.com:test')
			})
		})	
		.then((response) => response.json())
		.then((data) => this.setState({data: data.items}));
	}
	
	onSubmit = () => {
		event.preventDefault();
		const _me = this;
		// alterar o site id (35268) antes de fazer a chamada na API
		const apiUrl = "http://localhost:8080/o/headless-delivery/v1.0/sites/35268/blog-postings";
		const form = event.target
		const blogPost = {};
		blogPost.image = {};
		
		blogPost.headline = form.elements.titulo.value;
		blogPost.articleBody = form.elements.texto.value;
		blogPost.datePublished = new Date().toISOString().split('T')[0];
		blogPost.image.contentUrl = form.elements.url.value;
		blogPost.image.imageId = form.elements.imageId.value;
		
		console.log(blogPost);
		
        fetch(apiUrl,
        {
            method: "POST",
			headers: new Headers({
				Authorization: "Basic " + btoa('test@liferay.com:test'),
				"content-type": "application/json"
			}),
            body: JSON.stringify(blogPost)
        })
        .then((response) => response.json())
        .then((data) => this.fetchData())		
	}
	
    render() {
        return (
            <Container>
	        	<Row>
		    		<Col>
		    			<CardDeck>
			    			{ this.state.data?this.state.data.map(item => (
	    						<Card style={{ width: "18rem" }}>
	    						<Card.Img variant="top" src={item.image.contentUrl?item.image.contentUrl:''} />
	    							<Card.Body>
	    								<Card.Title>{item.headline}</Card.Title>
	    								<Card.Text>{item.articleBody.replace(/(<([^>]+)>)/ig, '')}</Card.Text>
	    							</Card.Body>
	    						</Card>		    				
			    			)):''}
		    			</CardDeck>
		        	</Col>
		    	</Row>
		    	<hr />
		    	<h1 style={{ paddingTop: "10px", paddingBottom: "10px" }}>INCLUIR NOVO POST</h1>
		    	<Row>
		    		<Col>
		    			<Form onSubmit={this.onSubmit}>
							<Form.Group controlId="formBlogPost.Imagem">
								<Form.Label>URL da Imagem no Repositório</Form.Label>
								<Form.Control type="text" name="url" placeholder="URL da imagem" />
								<Form.Label>ID da Imagem no Repositório</Form.Label>
								<Form.Control type="number" name="imageId" placeholder="ID da imagem" />
							</Form.Group>			    			
							<Form.Group controlId="formBlogPost.Titulo">
								<Form.Label>Titulo</Form.Label>
								<Form.Control type="text" name="titulo" placeholder="Digite o titulo" />
							</Form.Group>	
							<Form.Group controlId="formBlogPost.Texto">
								<Form.Label>Texto</Form.Label>
								<Form.Control as="textarea" name="texto" rows={4} />
							</Form.Group>
							<Button variant="primary" type="submit">
						    	Salvar
						    </Button>								
		    			</Form>
		    		</Col>
		    	</Row>
            </Container>
        );
    }
}

export default MyFirstReactPortletApp;