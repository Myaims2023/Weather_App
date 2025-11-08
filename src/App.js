/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBengaluruWeather = async () => {
      try {
        const weather = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=ce496a1edaf9f933742ece6ea52aad64&units=metric`
        );
        setWeather(weather.data);
        const image = await axios.get(
          `https://api.unsplash.com/search/photos?query=Bengaluru city&client_id=nIcfKA-9A7lphsawDilSIjAHWeS_Un1QzxTV3p3_HKU`
        );
        setImage(image.data.results[0].urls.small);
        const description = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/Bengaluru`
        );
        setDescription(description.data.extract);
      } catch (err) {
        setError("Failed to load Bengaluru weather data.");
      }
    };
    getBengaluruWeather();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const weather = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce496a1edaf9f933742ece6ea52aad64&units=metric`
      );
      setWeather(weather.data);
      const image = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=nIcfKA-9A7lphsawDilSIjAHWeS_Un1QzxTV3p3_HKU`
      );
      setImage(image.data.results[0].urls.small);
      const description = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
      );
      setDescription(description.data.extract);
    } catch (err) {
      setError("City not found. Please enter a valid city name.");
    }
    setLoading(false);
  };

  return (
    <>
    <div className="weather-background">
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
    </div>
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={12}>
          <h1 className="text-center">
            <img className="logo-image" src={"/logo192.png"} alt="Logo Image" />
            &nbsp;Weather Forecast
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <b>Enter city name</b>
              </Form.Label>
              <Row>
                <Col xs={12} md={10}>
                  <Form.Control
                    type="text"
                    placeholder="City Name"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <Button variant="primary" type="Click">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
        <hr/>
        <Col xs={12} md={12}>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : error ? (
            <Col md={6} className="text-danger">
              {error}
            </Col>
          ) : (
            weather && (
              <div className="weather-section">
                <h2 className="text-center">
                  <b>Weather in {weather.name}</b>
                </h2>
                <br />
                <div className="weather-content">
                  <div className="city-image">
                    <img src={image} alt={weather.name} />
                  </div>
                  <p className="city-description">{description}</p>
                </div>

                <p className="summary">
                  Temperature: {weather.main.temp}°C | Humidity:{" "}
                  {weather.main.humidity}% | Wind speed: {weather.wind.speed}m/s
                </p>
              </div>
            )
          )}
        </Col>
      </Row>
    </Container>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          Made with <img src="./kiran_logo.png" alt="Kiran Raj" className="footer-logo" /> by Kiran Raj . R
        </div>
        <div className="social-links">
          <a href="https://github.com/0803860" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kiran-raj-r-72793228a/" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default App;
