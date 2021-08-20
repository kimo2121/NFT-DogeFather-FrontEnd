import InfoText from 'components/Text';
import { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './index.scss';
import Faqs from './faqs.json';

const FAQ = () => {
  const [faqList, setFAQList] = useState([1, 2, 3, 4, 5]);
  const [toggleAccordion, setToggleAccordion] = useState(-1);

  return (
    <>
      <InfoText size="xl" className="m-0 text-center page-heading">
        FAQS
      </InfoText>
      <InfoText variant="secondary" className="mb-5 text-center page-sub-heading">
        FREQUENTLY ASKED QUESTION'S
      </InfoText>

      <Accordion defaultActiveKey="0" className="faq-container">
        {Faqs.map((faq, i) => (
          <Card className={`rounded-0 border-0 p-0 ${toggleAccordion === i ? 'active shadow' : 'shadow-none'}`}>
            <Container>
              <Accordion.Toggle
                as={Row}
                eventKey={`faq${i}`}
                className="accordion-toggle m-0 align-items-center"
                onClick={() => (toggleAccordion === i ? setToggleAccordion(-1) : setToggleAccordion(i))}
              >
                <Col className="pl-0">
                  <InfoText variant="secondary" className="m-0">
                    {faq.title}
                  </InfoText>
                </Col>
                <Col xs="auto" className="pr-0">
                  <Image src={toggleAccordion === i ? '/img/minus.svg' : '/img/plus.svg'} />
                </Col>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`faq${i}`} className="py-3">
                <InfoText variant="secondary" className="m-0">
                  {faq.details}
                </InfoText>
              </Accordion.Collapse>
            </Container>
          </Card>
        ))}
      </Accordion>
    </>
  );
};
export default FAQ;
