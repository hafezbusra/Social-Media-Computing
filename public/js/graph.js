var x = ""
$(document).ready(function () {

    //var WordCloud


    $.ajax({
        method: "GET",
        url: "/api/data?_="+(new Date()).getTime(),
        dataType: "json",
        success: function (data) {
            console.log(data)
            drawEchartwc('wordcloud0', '#topmention', data)
            drawEchartwc('wordcloud1','#topmentiontwitter',data)
            drawEchartwc('wordcloud2', '#topmentionfb', data)
            drawBarStacked(data)
            DrawPie(data)
            DrawBarBrand(data)
            DrawNetwork(data)
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
});


function drawBarStacked(data) {
    
    fbPos = data.flightSentiment[0].positive
    fbNeg = data.flightSentiment[0].negative
    fbNeu = data.flightSentiment[0].neutral

    twPos = data.flightSentiment[1].positive
    twNeg = data.flightSentiment[1].negative
    twNeu = data.flightSentiment[1].neutral

    Highcharts.chart('stackbar', {
        chart: {
            type: 'bar',
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: ['Positive', 'Negative','Neutral']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total text processed'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'United',
            data: [twPos, twNeg, twNeu]
        }, {
            name: 'Virgin America',
            data: [fbPos, fbNeg, fbNeu]
        }]
    });
}

function drawEchartwc(charttype,tablename,data) {

    function createRandomtextStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    }
    hashtags = []

    if (charttype == 'wordcloud0'){
        data.positivewc.forEach(function (obj) {
            hashtags.push({
                name: obj.value,
                value: obj.number,
                textStyle: createRandomtextStyle()
            })
        });
    }
    if (charttype == 'wordcloud1') {
        data.negativewc.forEach(function (obj) {
            hashtags.push({
                name: obj.value,
                value: obj.number,
                textStyle: createRandomtextStyle()
            })
        });
    }
    if (charttype == 'wordcloud2') {
        data.neutralwc.forEach(function (obj) {
            hashtags.push({
                name: obj.value,
                value: obj.number,
                textStyle: createRandomtextStyle()
            })
        });
    }
   
    option = {
        tooltip: {
            show: true
        },
        series: [{
            name: '',
            type: 'wordCloud',
            size: ['80%', '80%'],
            rotationRange: [0, 0],
            gridSize: 8,
            width: '100%',
            height: '100%',
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 14
            },
            data: hashtags
        }]
    };

    var hashtags_graph = echarts.init(document.getElementById(charttype));
    hashtags_graph.setOption(option)

    //edit highest table
    var i;
    for (i = 0; i < 10; i++) {
        $(tablename).append('<tr>' +
            '<th>'+ (i+1) + '</th>' +
            '<td>' + hashtags[i].name + '</td>' +
            '<td>' + hashtags[i].value + '</td>' + '</tr>');
    }
    

}


function DrawPie(data){
    Highcharts.chart('piechart', {

        chart: {
            styledMode: true
        },

        title: {
            text: 'Flight Sentiment'
        },

        xAxis: {
            categories: ['positive','negative','neutral']
        },

        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: [
                ['Positive', data.totalSentiment[0].positive, true,true],
                ['Negative', data.totalSentiment[0].negative, false],
                ['Neutral', data.totalSentiment[0].neutral, false]
            ],
            showInLegend: true
        }],
        credits: {
            enabled: false
        }
    });
}

function DrawBarBrand(data){
    Highcharts.chart('multipleAxesfb', {

        chart: {
            type: 'column',
            styledMode: true
        },

        title: {
            text: 'Styling axes and columns'
        },xAxis: {
            categories: ['United Airline','Virgin America']
        },
        yAxis:{
            className: 'highcharts-color-0',
            title: {
                text: 'total'
            }
        },

        plotOptions: {
            column: {
                borderRadius: 5
            }
        },

        series: [{
            name: 'Bad Flight',
            data: [data.negativeReason[0]['Bad Flight'], data.negativeReason[1]['Bad Flight']]
        }, {
             name: 'Cancelled Flight',
                data: [data.negativeReason[0]['Cancelled Flight'], data.negativeReason[1]['Cancelled Flight']]
        }, {
            name: 'Cannot Tell',
                data: [data.negativeReason[0]['Cannot Tell'], data.negativeReason[1]['Cannot Tell']]
        },{
         name: 'Customer Service Issue',
                data: [data.negativeReason[0]['Customer Service Issue'], data.negativeReason[1]['Customer Service Issue']]
        }, {
             name: 'Damage Luggages',
                data: [data.negativeReason[0]['Damage Luggages'], data.negativeReason[1]['Damage Luggages']]
        }, {
            name: 'Flight Attendant Complaint',
                data: [data.negativeReason[0]['Flight Attendant Complaint'], data.negativeReason[1]['Flight Attendant Complaint']]
        },{
            name: 'Flight Booking Problem',
                data: [data.negativeReason[0]['Flight Booking Problem'], data.negativeReason[1]['Flight Booking Problem']]
        },{
            name: 'Late Flight',
                data: [data.negativeReason[0]['Late Flight'], data.negativeReason[1]['Late Flight']]
        },{
            name: 'Long Lines',
                data: [data.negativeReason[0]['Long Lines'], data.negativeReason[1]['Long Lines']]
        },{
            name: 'Lost Luggage',
                data: [data.negativeReason[0]['Lost Luggage'], data.negativeReason[1]['Lost Luggage']]
        }],
        credits: {
            enabled: false
        }

    });
}

function DrawNetwork(data){
    Highcharts.addEvent(
        Highcharts.seriesTypes.networkgraph,
        'afterSetOptions',
        function (e) {
            var colors = Highcharts.getOptions().colors,
                i = 0,
                nodes = {};
            e.options.data.forEach(function (link) {

                if (link[0] === 'Nike') {
                    nodes['Nike'] = {
                        id: 'Nike',
                        marker: {
                            radius: 20
                        }
                    };
                    nodes[link[1]] = {
                        id: link[1],
                        marker: {
                            radius: 10
                        },
                        color: colors[i++]
                    };
                } else if (nodes[link[0]] && nodes[link[0]].color) {
                    nodes[link[1]] = {
                        id: link[1],
                        color: nodes[link[0]].color
                    };
                }
            });

            e.options.nodes = Object.keys(nodes).map(function (id) {
                return nodes[id];
            });
        }
    );

    Highcharts.chart('multipleAxestw', {
        chart: {
            type: 'networkgraph',
            height: '100%'
        },
        title: {
            text: 'Nike Firends Network'
        },
        subtitle: {
            text: 'Network graph'
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to'],
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        series: [{
            dataLabels: {
                enabled: true
            },
            data: [
                ['Nike', 'KevinHart4real'],
                ['Nike', 'TimHowardGK'],
                ['Nike', 'TeamUSA'],
                ['Nike', 'GraceEGold'],
                ['Nike', 'AlexShibutani'],
                ['Nike', 'sagekotsenburg'],
                ['Nike', 'thenotorioustje'],
                ['Nike', 'ChrisWondo'],
                ['Nike', 'NikeLasVegas'],
                ['Nike', 'NikeDallas'],
                ['Nike', 'NikeBoston'],
                ['Nike', 'NikeSF'],
                ['Nike', 'ManUtd'],
                ['Nike', 'NikeCanada'],
                ['Nike', 'HopelessHannah1'],
                ['Nike', 'MariaSharapova'],
                ['Nike', 'McIlroyRory'],
                ['Nike', 'kobebryant'],
                ['Nike', 'Stevo2510'],
                ['Nike', '10Ronaldinho'],
                ['Nike', 'NikeRio'],
                ['Nike', 'SpiderAnderson'],
                ['Nike', 'AntDavis23'],
                ['Nike', 'NdamukongSuh'],
                ['Nike', 'NikeTraining'],
                ['Nike', 'NikeStadiums'],
                ['Nike', 'NikeLA'],
                ['Nike', 'NikeN7'],
                ['Nike', 'GinnieCrawford'],
                ['Nike', 'NikeUK'],
                ['Nike', 'coco_ho'],
                ['Nike', 'jasonlester'],
                ['Nike', 'sean_malto'],
                ['Nike', 'BoJackson'],
                ['Nike', 'RafaelNadal'],
                ['Nike', 'JLester34'],
                ['Nike', 'JimmyRollins11'],
                ['Nike', 'livestrong'],
                ['Nike', 'ovi8'],
                ['Nike', 'KyrieIrving'],
                ['Nike', 'NikeNYC'],
                ['Nike', 'vika7'],
                ['Nike', 'WesWelker'],
                ['Nike', 'path'],
                ['Nike', 'JustinTuck'],
                ['Nike', 'TeamVic'],
                ['Nike', 'stuholden'],
                ['Nike', 'clint_dempsey'],
                ['Nike', 'lauraenever'],
                ['Nike', 'Ozarsalazar1'],
                ['Nike', 'ShawnJohnson'],
                ['Nike', 'rissmoore10'],
                ['Nike', 'LanceMountain'],
                ['Nike', 'stefanjanoski'],
                ['Nike', 'shanejoneill'],
                ['Nike', 'theotisbeasley'],
                ['Nike', 'stewartcink'],
                ['Nike', 'TigerWoods'],
                ['Nike', 'paulajradcliffe'],
                ['Nike', 'allysonfelix'],
                ['Nike', 'G_Rupp'],
                ['Nike', 'AshtonJEaton'],
                ['Nike', 'shakesdrayton'],
                ['Nike', 'SanyaRichiRoss'],
                ['Nike', 'CarmelitaJeter'],
                ['Nike', 'gabrielmedinaaa'],
                ['Nike', 'julian_wilson'],
                ['Nike', 'koloheandino'],
                ['Nike', 'scottylago'],
                ['Nike', 'NigelSylvester'],
                ['Nike', 'dannykass'],
                ['Nike', 'erickoston'],
                ['Nike', 'prod84'],
                ['Nike', 'Revis24'],
                ['Nike', 'LarryFitzgerald'],
                ['Nike', 'drewbrees'],
                ['Nike', 'sj39'],
                ['Nike', 'Mark_Sanchez'],
                ['Nike', 'TimTebow'],
                ['Nike', 'tpolamalu'],
                ['Nike', 'MichaelVick'],
                ['Nike', 'D_Hest23'],
                ['Nike', 'GregJennings'],
                ['Nike', 'JerryRice'],
                ['Nike', 'ajgreen_18'],
                ['Nike', 'ClayMatthews52'],
                ['Nike', 'JacobyEllsbury'],
                ['Nike', 'ShaneVictorino'],
                ['Nike', 'teixeiramark25'],
                ['Nike', 'delpotrojuan'],
                ['Nike', 'serenawilliams'],
                ['Nike', 'phganso'],
                ['Nike', 'Javi_Pastore'],
                ['Nike', 'neymarjr'],
                ['Nike', 'CarliLloyd'],
                ['Nike', 'TobinHeath'],
                ['Nike', 'alexmorgan13'],
                ['Nike', 'hopesolo'],
                ['Nike', 'AbbyWambach'],
                ['Nike', 'andresiniesta8'],
                ['Nike', 'WayneRooney'],
                ['Nike', 'Cristiano'],
                ['Nike', 'swish41'],
                ['Nike', 'DeronWilliams'],
                ['Nike', 'blakegriffin23'],
                ['Nike', 'Amareisreal'],
                ['Nike', 'KingJames'],
                ['Nike', 'KDTrey5'],
                ['Nike', 'Nikecourt'],
                ['Nike', 'NikeWomen_JP'],
                ['Nike', 'NikeFootball_JP'],
                ['Nike', 'nikefootballita'],
                ['Nike', 'nikerun_jp'],
                ['Nike', 'nikefootballza'],
                ['Nike', 'nikefootfrance'],
                ['Nike', 'NikeChile'],
                ['Nike', 'NikeArgentina'],
                ['Nike', '1948london'],
                ['Nike', 'NikeLab'],
                ['Nike', 'teamnike'],
                ['Nike', 'nikefutebol'],
                ['Nike', 'NikeChicago'],
                ['Nike', 'nikebrasil'],
                ['Nike', 'Jumpman23'],
                ['Nike', 'nikegolf'],
                ['Nike', 'Nike_Spain'],
                ['Nike', 'nikebasketball'],
                ['Nike', 'NikeRunning'],
                ['Nike', 'nikebaseball'],
                ['Nike', 'nikesoccer'],
                ['Nike', 'usnikefootball'],
                ['Nike', 'nikesb'],
                ['Nike', 'nikefootball'],
                ['Nike', 'nikestore'],
                ['Nike', 'nikesportswear'],
                ['Nike', 'NIKEiD'],
                ['Nike', 'nikewomen0'],
                ['KevinHart4real', 'iamjazzzyyy'],
                ['KevinHart4real', 'TKOCBS'],
                ['KevinHart4real', 'Official_tylerg'],
                ['KevinHart4real', 'IMDb'],
                ['KevinHart4real', 'PaintingsBySal'],
                ['KevinHart4real', 'StandupDigital'],
                ['KevinHart4real', 'goldambush'],
                ['KevinHart4real', 'Eagles'],
                ['KevinHart4real', 'Cristiano'],
                ['TimHowardGK', 'FrancoPanizo'],
                ['TimHowardGK', 'Dag_RedFC'],
                ['TimHowardGK', 'Memphis901FC'],
                ['TimHowardGK', 'TheFryeCompany'],
                ['TimHowardGK', 'MLS'],
                ['TimHowardGK', 'ColoradoRapids'],
                ['TimHowardGK', 'AaronLennon12'],
                ['TimHowardGK', 'JmoSmooth13'],
                ['TimHowardGK', 'donachie_dan'],
                ['TimHowardGK', 'stuholden'],
                ['TimHowardGK', 'ElJimador'],
                ['TeamUSA', 'ImGailDevers'],
                ['TeamUSA', 'LakeyPeterson'],
                ['TeamUSA', 'koloheandino'],
                ['TeamUSA', 'cbasszietz'],
                ['TeamUSA', 'UMUTFXC'],
                ['TeamUSA', 'Buccigross'],
                ['TeamUSA', 'Toyota'],
                ['TeamUSA', 'TeamToyota'],
                ['TeamUSA', 'duffgoldman'],
                ['TeamUSA', 'PCski'],
                ['TeamUSA', '2019worldchamps'],
                ['GraceEGold', 'SaraBareilles'],
                ['GraceEGold', 'colesprouse'],
                ['GraceEGold', 'nicelilguy'],
                ['GraceEGold', 'danieljawn'],
                ['GraceEGold', 'arielwinter1'],
                ['GraceEGold', 'j3r3bear'],
                ['GraceEGold', 'Splenda'],
                ['GraceEGold', 'iceprincess0923'],
                ['GraceEGold', 'GCTGoats'],
                ['GraceEGold', 'Korea_Olympic'],
                ['GraceEGold', 'CarlyCGold'],
                ['AlexShibutani', 'IsaacKLee'],
                ['AlexShibutani', 'aherman2006'],
                ['AlexShibutani', 'HaleyOSomething'],
                ['AlexShibutani', 'fakemikemulloy'],
                ['AlexShibutani', 'IanKarmel'],
                ['AlexShibutani', 'LeicaCameraUSA'],
                ['AlexShibutani', 'SabrinaMiko'],
                ['AlexShibutani', 'TwitterFashion'],
                ['AlexShibutani', 'theREALmarvin'],
                ['AlexShibutani', 'meganamram'],
                ['AlexShibutani', 'NikeLA'],
                ['sagekotsenburg', 'yung_hails'],
                ['sagekotsenburg', 'codytownsend'],
                ['sagekotsenburg', 'POW_AF'],
                ['sagekotsenburg', 'gavinthomas'],
                ['sagekotsenburg', 'BucketsONeale00'],
                ['sagekotsenburg', 'TheVeganSociety'],
                ['sagekotsenburg', 'spidadmitchell'],
                ['sagekotsenburg', 'dbetcher44'],
                ['sagekotsenburg', 'ChloeKim'],
                ['sagekotsenburg', 'SnowBrains'],
                ['sagekotsenburg', 'kblock43'],
                ['thenotorioustje', 'ditto'],
                ['thenotorioustje', 'Lalaribeiro16'],
                ['thenotorioustje', 'trvisXX'],
                ['thenotorioustje', 'BigBoi'],
                ['thenotorioustje', 'joerogan'],
                ['thenotorioustje', 'jordan__kimball'],
                ['thenotorioustje', 'iampaulcampbell'],
                ['thenotorioustje', 'linalockheart'],
                ['thenotorioustje', 'GhostLifestyle'],
                ['thenotorioustje', 'virgilabloh'],
                ['thenotorioustje', 'thesecret'],
                ['ChrisWondo', 'peladoalmeyda'],
                ['ChrisWondo', 'CriisEspinoza7'],
                ['ChrisWondo', 'BusickRobby'],
                ['ChrisWondo', 'SanJoseUltras'],
                ['ChrisWondo', 'JGjertsen17'],
                ['ChrisWondo', 'eastbaycio'],
                ['ChrisWondo', 'islandhopperTVs'],
                ['ChrisWondo', 'DanSports2'],
                ['ChrisWondo', 'austindaluz'],
                ['ChrisWondo', 'wehan_14'],
                ['ChrisWondo', 'playingforpride'],
                ['NikeLasVegas', 'alekmarasigan'],
                ['NikeLasVegas', 'laurennblakeee'],
                ['NikeLasVegas', 'rodelaveli'],
                ['NikeLasVegas', 'nikevault'],
                ['NikeLasVegas', 'NikeSF'],
                ['NikeLasVegas', 'kobebryant'],
                ['NikeLasVegas', 'nikewomen'],
                ['NikeLasVegas', 'nikesb'],
                ['NikeLasVegas', 'NikeOC'],
                ['NikeLasVegas', 'NikeSeattle'],
                ['NikeLasVegas', 'NikeEugene'],
                ['NikeDallas', 'Nike'],
                ['NikeDallas', 'dallascowboys'],
                ['NikeDallas', 'JordanRogers26'],
                ['NikeDallas', 'SrBliga'],
                ['NikeDallas', 'jasonlester'],
                ['NikeDallas', 'mickistary'],
                ['NikeDallas', 'Jumpman23'],
                ['NikeDallas', 'NikeRunning'],
                ['NikeDallas', 'RealSkipBayless'],
                ['NikeDallas', 'NikeLab'],
                ['NikeDallas', 'KDTrey5'],
                ['NikeBoston', 'NikeOC'],
                ['NikeBoston', 'NikeScottsdale'],
                ['NikeBoston', 'NikeLA'],
                ['NikeBoston', 'hootsuite'],
                ['NikeBoston', 'usnikefootball'],
                ['NikeBoston', 'NikeDallas'],
                ['NikeBoston', 'NikeDC'],
                ['NikeBoston', 'RajonRondo'],
                ['NikeBoston', 'JacobyEllsbury'],
                ['NikeBoston', 'kobebryant'],
                ['NikeBoston', 'JLin7'],
                ['NikeSF', 'NikeLacrosse'],
                ['NikeSF', 'Nikecourt'],
                ['NikeSF', 'nikegolf'],
                ['NikeSF', 'NikeOC'],
                ['NikeSF', 'AYES0N'],
                ['NikeSF', 'NikeLab'],
                ['NikeSF', 'NikeDC'],
                ['NikeSF', 'NikeNYC'],
                ['NikeSF', 'NikeBoston'],
                ['NikeSF', 'NikeChicago'],
                ['NikeSF', 'NikeTwinCities']
            ]
        }]
    });

}




