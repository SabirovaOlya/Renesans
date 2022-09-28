import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, FormText, InputGroup, Input, Col, Row, Table } from 'reactstrap'

const Home = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Add a new Client 🙌</CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>Fill out form above to add a client</CardText>
      <Row>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Payment</th>
              <th scope="col">Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Client1</td>
              <td>123123$</td>
              <td>+998-(99)-123-45-67</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Client2</td>
              <td>123123$</td>
              <td>+998-(99)-123-45-67</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Client3</td>
              <td>123123$</td>
              <td>+998-(99)-123-45-67</td>
            </tr>
          </tbody>
        </table>
      </Row>
      <Link to='home/add-client' className='btn btn-lg btn-primary'>
        Add a Client
      </Link>
    </CardBody>
  </Card>
  )
}

export default Home
