import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

export function HeroPage() {
  const history = useHistory();

  const handleNavigate = (route: string) => {
    return () => {
      history.push({
        pathname: route,
      });
    };
  };
  return (
    <>
      <Helmet>
        <title>InviggoNet</title>
      </Helmet>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Welcome to InviggoNet application</h1>
          <p>We are best in our business</p>
          <div style={{ color: 'white' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleNavigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleNavigate('/register')}
              sx={{ marginLeft: '5px' }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              href="#our-section"
              sx={{ marginLeft: '5px' }}
            >
              About
            </Button>
          </div>
        </div>
      </div>
      <div className="our-section" id="our-section">
        <h1>Our services</h1>
        <p>
          We are best shop maybe ever. Buy from us everyday everytime you want.
          We have books. Books are awesome. After this comes random text.
        </p>
        <p>
          Moments its musical age explain. But extremity sex now education
          concluded earnestly her continual. Oh furniture acuteness suspected
          continual ye something frankness. Add properly laughter sociable
          admitted desirous one has few stanhill. Opinion regular in perhaps
          another enjoyed no engaged he at. It conveying he continual ye
          suspected as necessary. Separate met packages shy for kindness. <br />{' '}
          Real sold my in call. Invitation on an advantages collecting. But
          event old above shy bed noisy. Had sister see wooded favour income
          has. Stuff rapid since do as hence. Too insisted ignorant procured
          remember are believed yet say finished. <br />
          Is we miles ready he might going. Own books built put civil fully
          blind fanny. Projection appearance at of admiration no. As he totally
          cousins warrant besides ashamed do. Therefore by applauded acuteness
          supported affection it. Except had sex limits county enough the figure
          former add. Do sang my he next mr soon. It merely waited do unable.
        </p>
      </div>
    </>
  );
}
