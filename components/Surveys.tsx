import React from 'react';
import { Survey, TransportRequest } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.37-2.446a1 1 0 00-1.176 0l-3.37 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.07 9.387c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.96z" />
        </svg>
      ))}
    </div>
  );
};

interface SurveysProps {
    surveys: Survey[];
    requests: TransportRequest[];
}

const Surveys: React.FC<SurveysProps> = ({ surveys, requests }) => {
  const getRequestInfo = (requestId: string) => {
    return requests.find(r => r.id === requestId);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Encuestas de Servicio</h2>
       {surveys.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">No hay encuestas para mostrar todavía.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...surveys].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(survey => {
              const requestInfo = getRequestInfo(survey.requestId);
              return (
                <div key={survey.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold text-gray-800">
                            {requestInfo?.requester || 'Usuario Anónimo'}
                        </p>
                        <span className="text-sm text-gray-500">- Viaje a {requestInfo?.destination || 'N/A'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{survey.date}</p>
                    </div>
                    <StarRating rating={survey.rating} />
                  </div>
                  <p className="text-gray-600 mt-4 italic">"{survey.comments}"</p>
                </div>
              );
            })}
          </div>
       )}
    </div>
  );
};

export default Surveys;