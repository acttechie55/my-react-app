import { NutritionalInfo } from '../types/supplement';

interface NutritionalInfoTableProps {
  nutritionalInfo: NutritionalInfo;
}

function NutritionalInfoTable({ nutritionalInfo }: NutritionalInfoTableProps) {
  const formatValue = (value: number | null, unit: string = 'g') => {
    return value !== null ? `${value}${unit}` : 'N/A';
  };

  return (
    <div className="nutritional-info">
      <h3>Nutritional Information (per 100g/100ml)</h3>

      <table className="nutrition-table">
        <tbody>
          <tr>
            <td>Energy</td>
            <td>{formatValue(nutritionalInfo.energyKcal, ' kcal')}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{formatValue(nutritionalInfo.proteins)}</td>
          </tr>
          <tr>
            <td>Carbohydrates</td>
            <td>{formatValue(nutritionalInfo.carbohydrates)}</td>
          </tr>
          <tr>
            <td>- Sugars</td>
            <td>{formatValue(nutritionalInfo.sugars)}</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{formatValue(nutritionalInfo.fat)}</td>
          </tr>
          <tr>
            <td>- Saturated Fat</td>
            <td>{formatValue(nutritionalInfo.saturatedFat)}</td>
          </tr>
          <tr>
            <td>Fiber</td>
            <td>{formatValue(nutritionalInfo.fiber)}</td>
          </tr>
          <tr>
            <td>Sodium</td>
            <td>{formatValue(nutritionalInfo.sodium)}</td>
          </tr>
          <tr>
            <td>Salt</td>
            <td>{formatValue(nutritionalInfo.salt)}</td>
          </tr>
        </tbody>
      </table>

      {nutritionalInfo.vitamins && Object.keys(nutritionalInfo.vitamins).length > 0 && (
        <div className="vitamins-section">
          <h4>Vitamins</h4>
          <ul>
            {Object.entries(nutritionalInfo.vitamins).map(([vitamin, value]) => (
              <li key={vitamin}>
                {vitamin}: {value}mg
              </li>
            ))}
          </ul>
        </div>
      )}

      {nutritionalInfo.minerals && Object.keys(nutritionalInfo.minerals).length > 0 && (
        <div className="minerals-section">
          <h4>Minerals</h4>
          <ul>
            {Object.entries(nutritionalInfo.minerals).map(([mineral, value]) => (
              <li key={mineral}>
                {mineral}: {value}mg
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NutritionalInfoTable;
