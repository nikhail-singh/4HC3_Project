from calendar import monthrange
from random import choice
import json

def generateJSON(years=[2020], months=[11,12]):
    """
    Generate a JSON dict that can be interpreted for room availability
    """
    result = dict()
    for y in years:
        result[y] = dict()
        for m in months:
            result[y][m] = dict()
            for d in range(1, monthrange(y, m)[1] + 1):
                result[y][m][d] = dict()
                for t in range(800,2100,100):
                    result[y][m][d][t] = dict()
                    for r in ['201', '203', '204A', '204B', '205']:
                        result[y][m][d][t][r] = choice([True, False])
                for t in range(830,2100,100):
                    result[y][m][d][t] = dict()
                    for r in ['201', '203', '204A', '204B', '205']:
                        result[y][m][d][t][r] = choice([True, False])
    return result


if __name__ == '__main__':
    with open('project/src/data/roomAvailability.js', 'w') as fh:
        print("export const roomAvailability = ", file=fh)
        print(json.dumps(generateJSON(), indent=4), file=fh)
