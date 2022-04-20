import { useDispatch, useSelector } from "react-redux";
import { fetchFilters, activeFilterChanged } from "../../actions";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import classNames from 'classnames';

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state.filtersReducer);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
        // eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, value}) => {

            const btnClass = classNames('btn', className, {
                'active': value === activeFilter
            });
            
            return <button 
                        key={value} 
                        id={value} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(value))}
                        >{name}</button>
        })
    }
   
    const buttons = renderFilters(filters);
   
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;