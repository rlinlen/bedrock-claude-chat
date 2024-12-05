import React, { useEffect, useState } from 'react';
import Button from './Button';
import Textarea from './Textarea';
import { PiPlus, PiTrash } from 'react-icons/pi';
import { KBMetadataFilter } from '../features/knowledgeBase/types';

type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'greaterThanOrEquals'
  | 'lessThan'
  | 'lessThanOrEquals'
  | 'in'
  | 'notIn'
  | 'startsWith'
  | 'stringContains';

type LogicalOperator = 'andAll' | 'orAll';

interface FilterAttribute {
  key: string;
  value: string | number | string[];
}

interface BasicFilter {
  [key: string]: FilterAttribute;
}

interface LogicalFilter {
  andAll?: (BasicFilter | LogicalFilter)[];
  orAll?: (BasicFilter | LogicalFilter)[];
}

type Filter =
  | BasicFilter
  | LogicalFilter
  | FilterAttribute
  | Record<string, never>;

interface FilterGroupProps {
  onUpdate: (filter: Filter) => void;
  logicalOperator?: LogicalOperator;
  onDelete?: () => void;
  initialFilters: Filter[];
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  onUpdate,
  logicalOperator,
  onDelete,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const isRootLevel = !logicalOperator;
  const hasBasicFilters = filters.some(
    (filter) => !['andAll', 'orAll'].includes(Object.keys(filter)[0])
  );
  const hasLogicalGroups = filters.some((filter) =>
    ['andAll', 'orAll'].includes(Object.keys(filter)[0])
  );

  const addBasicFilter = () => {
    if (!isRootLevel) {
      const newFilters = [...filters, { equals: { key: '', value: '' } }];
      setFilters(newFilters);
      onUpdate({ [logicalOperator]: newFilters });
    } else {
      // top level do not have logical operator
      const newFilters = [...filters, { equals: { key: '', value: '' } }];
      setFilters(newFilters);
      onUpdate(Object.assign({}, ...newFilters));
    }
  };

  const addNestedGroup = (operator: LogicalOperator) => {
    const newFilters = [...filters, { [operator]: [] }];
    if (!isRootLevel) {
      setFilters(newFilters);
      onUpdate({ [logicalOperator]: newFilters });
    } else {
      // top level do not have logical operator
      setFilters(newFilters);
      onUpdate(Object.assign({}, ...newFilters));
    }
  };

  const updateFilter = (index: number, updatedFilter: Filter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
    if (!isRootLevel) {
      onUpdate({ [logicalOperator]: newFilters });
    } else {
      onUpdate(Object.assign({}, ...newFilters));
    }
  };

  const deleteFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (!isRootLevel) {
      onUpdate({ [logicalOperator]: newFilters });
    } else {
      onUpdate(Object.assign({}, ...newFilters));
    }
  };

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const getInitialFilters = (filter: Filter) => {
    if ((filter as LogicalFilter).andAll) {
      return (filter as LogicalFilter).andAll ?? [];
    }
    if ((filter as LogicalFilter).orAll) {
      return (filter as LogicalFilter).orAll ?? [];
    }
    return [];
  };

  return (
    <div className="my-2.5 rounded-md border p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h3>
          {logicalOperator === 'andAll'
            ? 'AND Group'
            : logicalOperator === 'orAll'
              ? 'OR Group'
              : 'Root Group'}
        </h3>
        {onDelete && logicalOperator && (
          <Button icon={<PiTrash />} onClick={onDelete}>
            Delete Group
          </Button>
        )}
      </div>
      {filters.map((filter, index) => (
        <div key={index} className="my-1">
          {Object.keys(filter)[0] === 'andAll' ||
          Object.keys(filter)[0] === 'orAll' ? (
            <FilterGroup
              logicalOperator={Object.keys(filter)[0] as LogicalOperator}
              onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
              onDelete={() => deleteFilter(index)}
              initialFilters={getInitialFilters(filter)}
            />
          ) : (
            <BasicFilterUI
              filter={filter as BasicFilter}
              onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
              onDelete={() => deleteFilter(index)}
            />
          )}
        </div>
      ))}

      <div className="mt-2.5">
        <Button
          outlined
          icon={<PiPlus />}
          disabled={isRootLevel && (hasBasicFilters || hasLogicalGroups)}
          onClick={addBasicFilter}>
          Filter
        </Button>
        <Button
          outlined
          icon={<PiPlus />}
          disabled={isRootLevel && (hasBasicFilters || hasLogicalGroups)}
          onClick={() => addNestedGroup('andAll')}>
          AND Group
        </Button>
        <Button
          outlined
          icon={<PiPlus />}
          disabled={isRootLevel && (hasBasicFilters || hasLogicalGroups)}
          onClick={() => addNestedGroup('orAll')}>
          OR Group
        </Button>
      </div>
    </div>
  );
};

interface BasicFilterUIProps {
  filter: BasicFilter;
  onUpdate: (filter: BasicFilter) => void;
  onDelete: () => void;
}

const BasicFilterUI: React.FC<BasicFilterUIProps> = ({
  filter,
  onUpdate,
  onDelete,
}) => {
  const filterTypes: FilterOperator[] = [
    'equals',
    'notEquals',
    'greaterThan',
    'greaterThanOrEquals',
    'lessThan',
    'lessThanOrEquals',
    'in',
    'notIn',
    'startsWith',
    'stringContains'
  ];

  const currentType = Object.keys(filter)[0] as FilterOperator;
  const { key, value } = filter[currentType];

  const updateFilterType = (newType: FilterOperator) => {
    onUpdate({ [newType]: { key, value } });
  };

  const updateKey = (newKey: string) => {
    onUpdate({ [currentType]: { ...filter[currentType], key: newKey } });
  };

  const updateValue = (newValue: string) => {
    if (['in', 'notIn'].includes(currentType)) {
      onUpdate({
        [currentType]: { ...filter[currentType], value: newValue.split(',') },
      });
    } else if (
      [
        'equals',
        'greaterThan',
        'greaterThanOrEquals',
        'lessThan',
        'lessThanOrEquals',
      ].includes(currentType)
    ) {
      // Check if the value can be converted to a number
      const numericValue = Number(newValue);
      // Use the numeric value if it's a valid number and not NaN
      const finalValue = !isNaN(numericValue) ? numericValue : newValue;
      // check if the value is wrapped around "". If so, remove the "".
      const finalValueWithQuotes =
        newValue.startsWith('"') && newValue.endsWith('"')
          ? newValue.slice(1, -1)
          : finalValue;
      onUpdate({
        [currentType]: { ...filter[currentType], value: finalValueWithQuotes },
      });
    } else {
      onUpdate({ [currentType]: { ...filter[currentType], value: newValue } });
    }
  };

  return (
    <div className="my-1.5 flex items-center gap-2.5">
      <select
        value={currentType}
        className="rounded border p-1.5"
        onChange={(e) => updateFilterType(e.target.value as FilterOperator)}>
        {filterTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="rounded border p-1.5"
        value={key}
        onChange={(e) => updateKey(e.target.value)}
        placeholder="Key"
      />

      <input
        type="text"
        className="rounded border p-1.5"
        value={Array.isArray(value) ? value.join(',') : value}
        onChange={(e) => updateValue(e.target.value)}
        placeholder={
          ['in', 'notIn'].includes(currentType)
            ? 'Values (comma-separated)'
            : 'Value'
        }
      />

      <Button className="bg-red" onClick={onDelete} icon={<PiTrash />}>
        Delete
      </Button>
    </div>
  );
};

interface FilterBuilderProps {
  rootFilter: KBMetadataFilter;
  setRootFilter: (filter: KBMetadataFilter) => void;
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({
  rootFilter,
  setRootFilter,
}) => {
  const [rootOperator, setRootOperator] = useState<LogicalOperator | undefined>(
    undefined
  );

  const handleDeleteRoot = () => {
    setRootOperator(undefined);
    setRootFilter({});
  };

  // convert rootFilter from a dict to arrayof Filter[]
  const convertFilterDictToArray = (filterDict: KBMetadataFilter): Filter[] => {
    const filterArray: Filter[] = [];
    for (const key in filterDict) {
      filterArray.push({ [key]: filterDict[key] });
    }
    return filterArray;
  };

  return (
    <div>
      <h2>Filter Builder</h2>
      <FilterGroup
        logicalOperator={rootOperator}
        onUpdate={setRootFilter}
        onDelete={handleDeleteRoot}
        initialFilters={convertFilterDictToArray(rootFilter)}
      />
      <div>
        <Textarea
          label="Filter Preview"
          disabled={true}
          rows={5}
          value={JSON.stringify(rootFilter, null, 2)}
        />
      </div>
    </div>
  );
};
export default FilterBuilder;
