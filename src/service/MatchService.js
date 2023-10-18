import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BASE_API_URL = 'http://localhost:8080/api/v1';

class MatchService {


    deleteMatchById(matchID) {
        return axios.delete(BASE_API_URL + '/delete-match/' + matchID);
    }

}

export default new MatchService();