import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = event => {
    const { value } = event.target;
    dispatch(changeFilter(value));
  };

  return (
    <>
      <div>
        <label htmlFor="filter">Find contacts by name</label>
      </div>
      <input
        className={s.fieldInput}
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={onChange}
      />
    </>
  );
}
