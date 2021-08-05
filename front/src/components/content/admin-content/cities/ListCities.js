import React, {Fragment, useEffect, useState} from "react";
import EditCity from "./EditCity";
import InputCity from "./InputCity";
import {SERVER_URL} from "../../../../constants";
import {getCities} from "../../getData";

const ListCities = () => {
    const [cities, setCities] = useState([]);

    const deleteCity = async (id) => {
        try {
            await fetch(SERVER_URL + `cities/${id}`, {
                method: "DELETE"
            });
            await getCities(setCities)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCities(setCities)
    }, [])

    return (
        <Fragment>
            {" "}
            <h2 className="text-left mt-5">Список городов</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название города</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {cities?.map(city => (
                    <tr key={city.city_id}>
                        <th scope="row"> {city.city_id}</th>
                        <td>{city.city_name}</td>
                        <td><EditCity city={city}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => deleteCity(city.city_id)}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <InputCity/>
        </Fragment>
    )
}
export default ListCities