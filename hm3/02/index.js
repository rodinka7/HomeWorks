var objA = {

    prop1: 'value1',

    prop2: 'value2',

    prop3: 'value3',

    prop4: {

        subProp1: 'sub value1',

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        }

    },

    prop5: 1000,

    prop6: new Date(2016, 2, 10)

};



var objB = {

    prop5: 1000,

    prop3: 'value3',

    prop1: 'value1',

    prop2: 'value2',

    prop6: new Date('2016/03/10'),

    prop4: {

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        },

        subProp1: 'sub value1'

    }

};

var a = {
    a: 1,
    b: 2,
    c: 3
},
b = {
    a: 1,
    b: 2,
    c: 4
}
function compareLink(a,b) {
    if (a === b) return true
}

function compareProp(a,b) {

   for (var propA of a) {

        for (var propB of b) {
          
            if (propB === propA) {
                console.log(propB+ ' = '+ propA);
                break;
            }
    
        }

        if (propB !== propA) return false
    }

    return true
}

function  compareVal(a,b) {
    
    for (var propA in a) {

        for (var propB in b) {
          
            if (b[propB] === a[propA]) {
                console.log(b[propB]+ ' = '+ a[propA]);
                break;
            } else {
                if (compareSubProp(a,b)) {
                    
                    break;
                }
            }
    
        }

        //if (b[propB] !== a[propA]) return false
    }

    return true
}

function compareSubProp(a,b) {

    for (var propA in a) {   
       if(typeof a[propA] === 'object') {
        console.log(a[propA])
        var a1 = Object.keys(a[propA]);
        console.log('a1= '+ a1);      
       }
    }

    for (var propB in b) {   
       if(typeof b[propB] === 'object') {
        console.log(a[propA])
        var b1 = Object.keys(b[propB]);
        console.log('b1= '+b1);      
       }
    }

    if(compareProp(a1,b1)) return true;

    return false
}

function deepEqual(a, b) {

    var aProp = Object.getOwnPropertyNames(a),
        bProp = Object.getOwnPropertyNames(b);

    if (compareLink(a,b)) {
        return true
    }

    if (compareProp(aProp,bProp)) {
        if (compareVal(a,b)) {
           return true
        }
    } else return false
}

console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true