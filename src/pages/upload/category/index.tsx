import CheckButton from 'components/button/check';
import { useState } from 'react';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import './index.scss';

interface propsType {
  onChange?: (categories: string[]) => void;
}

const CategoryCard = (props: propsType) => {
  const [categories, setCategories] = useState<Array<string>>([]);

  const handleCheckboxChange = (category: string, checked: boolean) => {
    const newCategories = [...categories];
    var isInclude = false;
    for (var i = newCategories.length - 1; i >= 0; i--) {
      if (newCategories[i] === category) {
        isInclude = true;
        if (!checked) newCategories.splice(i, 1);
      }
    }
    if (!isInclude && checked) {
      newCategories.push(category);
    }

    setCategories(newCategories);

    props.onChange && props.onChange(newCategories);
  };

  return (
    <Card className="cat-card">
      <Card.Body>
        <Row className="justify-content-around">
          <CheckButton
            id="cb1"
            img="/img/games.png"
            label="Games"
            className="m-0 mb-3"
            checked={categories.includes('Games')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb2"
            img="/img/rainbow.png"
            label="Art"
            className="m-0 mb-3"
            checked={categories.includes('Art')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb3"
            img="/img/photo.png"
            label="Photo"
            className="m-0 mb-3"
            checked={categories.includes('Photo')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb4"
            img="/img/punks.png"
            label="Punks"
            className="m-0 mb-3"
            checked={categories.includes('Punks')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb5"
            img="/img/music.png"
            label="Music"
            className="m-0 mb-3"
            checked={categories.includes('Music')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb6"
            img="/img/memes.png"
            label="Memes"
            className="m-0 mb-3"
            checked={categories.includes('Memes')}
            onClick={handleCheckboxChange}
          />

          <CheckButton
            id="cb7"
            img="/img/meta.png"
            label="Meta"
            className="m-0 mb-3"
            checked={categories.includes('Meta')}
            onClick={handleCheckboxChange}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CategoryCard;
