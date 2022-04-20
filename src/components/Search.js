import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

function Search() {
    const [search, setSearch] = useState("");

    return (
        <Container className='mt-5'>
             <Form className='mb-3'>
                <Form.Control 
                    size="lg"
                    type="text"
                    placeholder="Chercher une attraction..." 
                    onChange={(e) => (setSearch(e.target.value))}
                />
            </Form>
            <Button 
                style={{ marginRight:10 }}
            >
                Disneyland Park
            </Button>
            <Button>
                Walt Disney Studios Park
            </Button>
        </Container>
    );
}

export default Search;