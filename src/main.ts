import * as fs from 'fs';
import * as path from 'path';

const workingDir = process.cwd();
const packetDirName = 'packets'; // パケットファイルを置くディレクトリ名
const packetFileExtendion = '.pks'; // パケットスキーマ定義ファイルとして扱う拡張子名

const files = fs.readdirSync(`${workingDir}/${packetDirName}`, {
    withFileTypes: true,
});

// ディレクトリ直下のファイルのみ走査
for (const file of files) {
    if (path.extname(file.name) !== packetFileExtendion) {
        continue;
    }

    console.log(`filename:${path.extname(file.name)} file?: d${file.isFile()}`);

    try {
        const buffer = fs.readFileSync(
            `${workingDir}/${packetDirName}/${file.name}`,
            'utf8',
        );
        console.log(buffer);
    } catch (error) {
        console.log(`failed to read error:${error}`);
    }
}
