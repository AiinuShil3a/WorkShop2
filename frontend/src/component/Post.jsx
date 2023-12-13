import { Link } from 'react-router-dom';

const Post = () => {
  return (
    <div className='post'>
      <div className='images'>
        <Link to='/post-detail'>
          <img src="https://s.isanook.com/ns/0/ud/1828/9140610/ss(1).jpg?ip/crop/w728h431/q80/webp" alt='' />
        </Link>
      </div>
      <div className='texts'>
        <Link to='/post-detail'>
          <h2>ไล่ออกเปลี่ยนชีวิต! "อดีตครูสาว" ผันตัวทำโอนลีแฟนส์ แค่ 6 เดือนกวาดเงินไป 35 ล้าน</h2>
        </Link>
        <p className='info'>
          <a href='https://www.sanook.com/news/9140610/' className='author'>
            Supphalak
          </a>
          <time>12 December 2023 - 18:52</time>
        </p>
        <p className='summary'>
          เดลี สตาร์ สื่อดังแห่งประเทศอังกฤษ เปิดเผยเรื่องราวสุดสยิว 
          เมื่อมีหญิงสาวรายหนึ่งถูกไล่ออกจากอาชีพคุณครู ก่อนจะหันมาเดินหน้าทำโอนลีแฟนส์ (OnlyFans) 
          เต็มตัว จนทำรายได้ไปมากถึง 35 ล้านบาทภายในระยะเวลาแค่ครึ่งปีเท่านั้น
        </p>
      </div>
    </div>
  );
};

export default Post;
